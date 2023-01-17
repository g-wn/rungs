import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './ChatSelector.css';

const ChatSelector = ({ chat, socket }) => {
  const currentUser = useSelector(state => state.session.user);
  const chatRecipient = chat.users.filter(user => user.id !== currentUser.id)[0];
  const [mostRecentMessage, setMostRecentMessage] = useState(chat.messages[chat.messages.length - 1].body);

  useEffect(() => {
    socket.on('chat', message => {
      setMostRecentMessage(message.body);
    });
  });

  return (
    <div className='chat-selector-container'>
      <img
        src={chatRecipient.profile.profileImageUrl}
        alt='Profile Img'
        className='selector-recipient-img'
      />
      <div className='selector-details'>
        <div className='chat-selector-name'>
          {chatRecipient.firstName} {chatRecipient.lastName}
        </div>
        <div className='chat-selector-preview'>
          {chat.messages.length > 0 ? mostRecentMessage : <div>No messages, yet</div>}
        </div>
      </div>
    </div>
  );
};

export default ChatSelector;
