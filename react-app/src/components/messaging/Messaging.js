import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChat, getChats } from '../../store/chats';
import ChatSelector from './ChatSelector';
import SingleChat from './SingleChat';
import './Messaging.css';

const Messaging = ({ socket }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const chats = useSelector(state => Object.values(state.chats));

  chats.sort((a, b) => {
    return (
      a.messages.length && b.messages.length ? (
        new Date(b.messages[b.messages.length - 1].createdAt) - new Date(a.messages[a.messages.length - 1].createdAt)
      ) : (
        new Date(b.createdAt) - new Date(a.createdAt)
      )
    );
  });

  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    dispatch(getChats());

    const refreshChats = setInterval(() => dispatch(getChats()), 2000);
    return () => clearInterval(refreshChats);
  }, [dispatch]);

  const setAndLoadChat = async chat => {
    await dispatch(getChat(chat.id));
    setSelectedChat(chat);
  };

  return (
    <div className='messaging-page-container'>
      <div className='messaging-chat-conversations'>
        <div className='conversations-header bold'>Messaging</div>
        <div className='conversations-body'>
          {chats.length > 0 ? (
            chats.map((chat, idx) => (
              <div
                key={idx}
                onClick={() => setAndLoadChat(chat)}
              >
                <ChatSelector chat={chat} />
              </div>
            ))
          ) : (
            <div className='no-chats'>You don't have any chats, yet.</div>
          )}
        </div>
      </div>

      <div className='messaging-chat-display'>
        <div className='chat-display-header bold'>
          {selectedChat
            ? `${selectedChat.users.filter(user => +user.id !== +currentUser.id)[0].firstName}
            ${selectedChat.users.filter(user => +user.id !== +currentUser.id)[0].lastName}`
            : 'Select a Chat...'}
        </div>
        <div className='chat-display-body'>
          {selectedChat && (
            <SingleChat
              chat={selectedChat}
              socket={socket}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Messaging;
