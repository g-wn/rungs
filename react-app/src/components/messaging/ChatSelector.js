import { useSelector } from 'react-redux';
import './ChatSelector.css';

const ChatSelector = ({ chat }) => {
  const currentUser = useSelector(state => state.session.user);
  const chatRecipient = chat.users.filter(user => user.id !== currentUser.id)[0];

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
          {chat.messages.length > 0 ? chat.messages[-1] : <div>No messages, yet</div>}
        </div>
      </div>
    </div>
  );
};

export default ChatSelector;
