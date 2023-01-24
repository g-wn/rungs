import { NavLink } from 'react-router-dom';

const SingleMessage = ({ message }) => {
  const sentAt = new Date(message.createdAt);

  return (
    <>
      <NavLink to={`/users/${message.sender.id}`}>
        <img
          src={message.sender.profile.profileImageUrl}
          alt='Profile Img'
          className='chat-msg-img'
        />
      </NavLink>
      <div className='chat-msg'>
        <NavLink
          to={`/users/${message.sender.id}`}
          className='chat-msg-sender-name bold'
        >
          {message.sender.firstName} {message.sender.lastName}
        </NavLink>
        <span className='chat-msg-timestamp'>
          {' '}
          &bull; {sentAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        <div className='chat-msg-body'>{message.body}</div>
      </div>
    </>
  );
};

export default SingleMessage;
