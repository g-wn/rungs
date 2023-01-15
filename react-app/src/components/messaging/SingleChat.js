import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChats, putMessage } from '../../store/chats';
import './SingleChat.css';

const SingleChat = ({ chat, socket }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const chatRecipient = chat.users.filter(user => user.id !== currentUser.id)[0];
  const chats = useSelector(state => state.chats);
  const [messages, setMessages] = useState(chats[chat.id].messages);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    dispatch(getChats());
    setMessages(chats[chat.id].messages);
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
  }, [socket, setMessages]);

  const sendChat = async e => {
    e.preventDefault();

    const newMessage = await dispatch(
      putMessage(chat.id, {
        body: chatInput
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
      <div className='chat-msg-display'>
        {messages.length > 0 ? (
          messages.map((message, idx) => (
            <div
              key={idx}
              className='chat-msg-container'
            >
              <img
                src={message.sender.profile.profileImageUrl}
                alt='Profile Img'
                className='chat-msg-img'
              />
              <div className='chat-msg'>
                <span className='chat-msg-sender-name bold'>
                  {message.sender.firstName} {message.sender.lastName}
                </span>
                <span className='chat-msg-timestamp'> &bull; {message.createdAt}</span>
                <div className='chat-msg-body'>{message.body}</div>
              </div>
            </div>
          ))
        ) : (
          <div className='chat-msg-container'>No messages, yet.</div>
        )}
        <div className='hello'></div>
      </div>
      <form
        onSubmit={sendChat}
        className='chat-form'
      >
        <div
          id='chat-input'
          className='chat-input'
        >
          <input
            onChange={e => setChatInput(e.target.value)}
            value={chatInput}
          />
          <button type='submit'>Send</button>
        </div>
      </form>
    </div>
  );
};

export default SingleChat;
