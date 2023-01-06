import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { io } from 'socket.io-client';
import './SingleChat.css';

// let socket;

const SingleChat = ({ room, socket }) => {
  const currentUser = useSelector(state => state.session.user);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    // socket = io();

    socket.on('chat', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on('join', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on('leave', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.emit('join', { user: currentUser.firstName, room: room });

    return () => {
      socket.emit('leave', { user: currentUser.firstName, room: room });
      // socket.disconnect();
    };
  }, [socket, setMessages, room, currentUser.firstName]);

  const updateChatInput = e => {
    setChatInput(e.target.value);
  };

  const sendChat = e => {
    e.preventDefault();

    socket.emit('chat', { user: `${currentUser.firstName} ${currentUser.lastName}`, msg: chatInput, room: room, recipient: "Christopher" });

    setChatInput('');
  };

  return (
    <>
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
        <input
          value={chatInput}
          onChange={updateChatInput}
        />
        <button type='submit'>Send</button>
      </form>
    </>
  );
};

export default SingleChat;
