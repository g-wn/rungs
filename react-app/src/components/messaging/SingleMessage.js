const SingleMessage = ({ message }) => {
  const sentAt = new Date(message.createdAt);

  return (
    <>
      <img
        src={message.sender.profile.profileImageUrl}
        alt='Profile Img'
        className='chat-msg-img'
      />
      <div className='chat-msg'>
        <span className='chat-msg-sender-name bold'>
          {message.sender.firstName} {message.sender.lastName}
        </span>
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
