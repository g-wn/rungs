import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChats, putMessage } from '../../store/chats';
import SingleMessage from './SingleMessage';
import './SingleChat.css';

const SingleChat = ({ chat }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const socket = useSelector(state => state.socket);
  const chatRecipient = chat.users.filter(user => user.id !== currentUser.id)[0];
  const chats = useSelector(state => state.chats);
  const [messages, setMessages] = useState(chats[chat.id].messages);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    dispatch(getChats());
    setMessages(chats[chat.id].messages);
    document.getElementById('chat-msg-display').scrollTo(0, document.getElementById('chat-msg-display').scrollHeight);
    document.getElementById('chat-input').focus();
  }, [dispatch, chat.id]); // eslint-disable-line

  // HANDLE JOIN AND LEAVE ROOM:
  useEffect(() => {
    socket.emit('join', { user: currentUser.firstName, room: chat.id });

    return () => {
      socket.emit('leave', { user: currentUser.firstName, room: chat.id });
    };
  }, [socket, chat.id, currentUser.firstName]);

  // HANDLE DISPLAYED MESSAGES:
  useEffect(() => {
    socket.on('chat', message => {
      setMessages(messages => [...messages, message]);
    });

    return () => socket.off('chat');
  }, [socket, setMessages]);

  const sendChat = async e => {
    e.preventDefault();

    const newMessage = await dispatch(
      putMessage(chat.id, {
        body: chatInput.trim()
      })
    );

    if (newMessage) {
      socket.emit('chat', {
        sender: currentUser,
        body: chatInput,
        createdAt: newMessage.createdAt,
        room: chat.id
      });

      socket.emit('notification', {
        recipient: chatRecipient
      });

      setChatInput('');
    }
  };

  return (
    <div className='chat-display'>
      <div
        id='chat-msg-display'
        className='chat-msg-display'
      >
        {messages.length > 0 ? (
          messages.map((message, idx) => (
            <div key={idx}>
              {new Date(message.createdAt).getDay() !== new Date(messages[idx - 1]?.createdAt).getDay() && (
                <div className='new-send-date light-text'>
                  {new Date(message.createdAt).getDay() !== new Date().getDay() ? (
                    <>
                      <span>
                        {new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(message.createdAt))}{' '}
                        {new Date(message.createdAt).getDate()}
                      </span>
                    </>
                  ) : (
                    <span>today</span>
                  )}
                </div>
              )}
              <div
                className='chat-msg-container'
              >
                {message.sender.id !== messages[idx - 1]?.sender.id ||
                new Date(message.createdAt).getDay() !== new Date(messages[idx - 1]?.createdAt).getDay() ? (
                  <SingleMessage message={message} />
                ) : (
                  <div className='chat-msg-body same-sender'>{message.body}</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className='chat-msg-container'>No messages, yet.</div>
        )}
        <div className='scroll-anchor'></div>
      </div>
      <form
        onSubmit={sendChat}
        className='chat-form'
      >
        <div className='chat-input'>
          <textarea
            id='chat-input'
            onChange={e => setChatInput(e.target.value)}
            placeholder='Write a message...'
            value={chatInput}
          />
        </div>
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};

export default SingleChat;
