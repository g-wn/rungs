import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './SingleChat.css';

const SingleChat = ({ room, socket }) => {
  const currentUser = useSelector(state => state.session.user);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  // HANDLE JOIN AND LEAVE ROOM:
  useEffect(() => {
    socket.emit('join', { user: currentUser.firstName, room: room });

    socket.on('leave', message => {
      setMessages(messages => [...messages, message]);
    });

    return () => {
      socket.emit('leave', { user: currentUser.firstName, room: room });
    };
  }, [socket, room, currentUser.firstName]);

  // HANDLE DISPLAYED MESSAGES:
  useEffect(() => {
    socket.on('join', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on('chat', message => {
      setMessages(messages => [...messages, message]);
    });
  }, [socket, setMessages, currentUser.firstName]);

  const sendChat = e => {
    e.preventDefault();

    socket.emit('chat', {
      user: `${currentUser.firstName} ${currentUser.lastName}`,
      msg: chatInput,
      room: room,
      recipient: 'Christopher'
    });

    setChatInput('');
  };

  return (
    <div className='chat-display'>
      <div className='chat-msg-display'>
        {messages.map((message, idx) => (
          <div
            key={idx}
            className='chat-msg'
          >{`${message.user}: ${message.msg}`}</div>
        ))}
      </div>
      <form
        onSubmit={sendChat}
        className='chat-form'
      >
        <div className='chat-input'>
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
