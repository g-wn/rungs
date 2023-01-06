import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import './Chat.css';

let socket;

const Chat = () => {
  const currentUser = useSelector(state => state.session.user);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    socket = io();

    socket.on('chat', chat => {
      setMessages(messages => [...messages, chat]);
    });

    socket.emit('join', { username: currentUser.firstName, room: 1 });

    return () => {
      socket.disconnect();
    };
  }, []);

  const updateChatInput = e => {
    setChatInput(e.target.value);
  };

  const sendChat = e => {
    e.preventDefault();

    socket.emit('chat', { user: `${currentUser.firstName} ${currentUser.lastName}`, msg: chatInput });

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

export default Chat;
