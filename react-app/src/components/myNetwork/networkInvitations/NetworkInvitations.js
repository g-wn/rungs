import { useSelector } from 'react-redux';
import SingleConnectionCard from '../singleConnection/SingleConnectionCard';
import './NetworkInvitations.css';

const NetworkInvitations = () => {
  const network = useSelector(state => state.network);
  const { connections, followers } = network;

  let requests = [];

  for (let id of Object.keys(followers)) {
    if (!(id in connections)) {
      requests.push(followers[id]);
    }
  }

  return (
    <div className='network-invitations-container'>
      <div className='network-invitations-header'>Invitations</div>
      <div className='network-invitations-body'>
        {requests.length > 0
          ? requests.map((user, idx) => (
              <SingleConnectionCard
                user={user}
                invitation={true}
                key={idx}
              />
            ))
          : 'No pending invitations'}
      </div>
    </div>
  );
};

export default NetworkInvitations;
