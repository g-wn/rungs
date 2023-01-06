import { useState } from 'react';
import './Messaging.css';
import SingleChat from './SingleChat';

const Messaging = ({ socket }) => {
  const [chatId, setChatId] = useState(1);

  return (
    <div className='messaging-page-container'>
      <div className='messaging-chat-conversations'>
        <div className='conversations-header bold'>Messaging</div>
        <div className='conversations-body'>
          <div>
            <button onClick={() => setChatId(1)}>Select Chat 1</button>
          </div>
          <div>
            <button onClick={() => setChatId(2)}>Select Chat 2</button>
          </div>
        </div>
      </div>

      <div className='messaging-chat-display'>
        <div className='chat-display-header bold'>{`Chat Display Header for Chat: ${chatId}`}</div>
        <div className='chat-display-body'>
          {chatId && (
            <SingleChat
              room={chatId}
              socket={socket}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Messaging;
