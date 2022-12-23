import { useSelector } from 'react-redux';
import NetworkInvitations from '../networkInvitations/NetworkInvitations';
import SingleConnectionCard from '../singleConnection/SingleConnectionCard';
import './NetworkMain.css';

const NetworkMain = () => {
  const connectionsArray = useSelector(state => Object.values(state.connections));

  return (
    <div className='network-right-side-container'>
      <div className='network-invitations-on-main'>
        <NetworkInvitations />
      </div>
      <div className='network-main-container'>
        {connectionsArray.length > 0 ? (
          connectionsArray.map((connection, idx) => (
            <div
              className='single-connection'
              key={idx}
            >
              <SingleConnectionCard user={connection} />
            </div>
          ))
        ) : (
          <div className='no-connections-message'>YOU DON'T HAVE ANY CONNECTIONS</div>
        )}
      </div>
    </div>
  );
};

export default NetworkMain;
