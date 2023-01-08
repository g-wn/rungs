import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IoMdNotifications } from 'react-icons/io';

import SingleConnectionCard from '../myNetwork/singleConnection/SingleConnectionCard';
import './NotiDropdown.css';

const NotiDropdown = () => {
  const [showNotiDrop, setShowNotiDrop] = useState(false);
  const network = useSelector(state => state.network);
  const { connections, followers } = network;

  const requests = [];

  for (let id of Object.keys(followers)) {
    if (!(id in connections)) {
      requests.push(followers[id]);
    }
  }

  const openDrop = () => {
    if (showNotiDrop) return;
    setShowNotiDrop(true);
  };

  useEffect(() => {
    if (!showNotiDrop) return;

    const closeDrop = () => {
      setShowNotiDrop(false);
    };

    document.addEventListener('click', closeDrop);

    return () => document.removeEventListener('click', closeDrop);
  }, [showNotiDrop]);

  return (
    <div className='nav-notifications-container'>
      <div
        className='nav-notifications'
        onClick={openDrop}
      >
        <div className='nav-notifications-icon'>
          <IoMdNotifications
            style={showNotiDrop && { transform: 'rotate(15deg)' }}
            size={25}
          />
          {requests.length > 0 && <div className='notifications-flag'>{requests.length}</div>}
        </div>
        <div className='nav-notifications-text'>Notifications</div>
      </div>
      {showNotiDrop && (
        <div className='notifications-container'>
          {requests.length > 0
            ? requests.map((user, idx) => (
                <SingleConnectionCard
                  user={user}
                  invitation={true}
                  key={idx}
                />
              ))
            : (
              <div className="no-notis-text">
                No notifications, you're all caught up!
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default NotiDropdown;
