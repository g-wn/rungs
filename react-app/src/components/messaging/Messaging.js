import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChats } from '../../store/chats';
import ChatSelector from './ChatSelector';
import SingleChat from './SingleChat';
import './Messaging.css';

const Messaging = ({ socket }) => {
  const dispatch = useDispatch();
  const chats = useSelector(state => Object.values(state.chats).reverse());
  const [selectedChat, setSelectedChat] = useState(chats.length > 0 ? chats[0] : null);

  useEffect(() => {
    dispatch(getChats())
  }, [dispatch])

  return (
    <div className='messaging-page-container'>
      <div className='messaging-chat-conversations'>
        <div className='conversations-header bold'>Messaging</div>
        <div className='conversations-body'>
          {chats.length > 0 ? (
            chats.map((chat, idx) => (
              <div
                key={idx}
                onClick={() => {setSelectedChat(chat)}}
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
          {selectedChat ? `${selectedChat.users[1].firstName} ${selectedChat.users[1].lastName}` : 'Select a Chat...'}
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
