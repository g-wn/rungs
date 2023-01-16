import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import ChatSelector from './ChatSelector';
import './MessagingModal.css';

let socket;

const MessagingModal = () => {
  const dispatch = useDispatch();
  let chats = useSelector(state => Object.values(state.chats));
  chats = chats.filter(chat => chat.messages.length > 0)

  useEffect(() => {
    socket = io();
    return () => socket.disconnect();
  }, [dispatch]);

  chats.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  useEffect(() => {
  }, [chats]);

  return (
    <div className='messaging-modal-container'>
      {chats.length > 0 ? (
        chats.map((chat, idx) => (
          <div key={idx}>
            <ChatSelector chat={chat} />
          </div>
        ))
      ) : (
        <div>oh no</div>
      )}
    </div>
  );
};

export default MessagingModal;
