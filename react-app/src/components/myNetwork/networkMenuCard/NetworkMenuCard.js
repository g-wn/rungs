import { MdPeopleAlt, MdPerson } from 'react-icons/md';
import './NetworkMenuCard.css';

const NetworkMenuCard = ({
  connections,
  followers,
  following,
  setConnectionsSelected,
  setFollowersSelected,
  setFollowingSelected
}) => {
  return (
    <div className='network-menu-card-container'>
      <div className='network-menu-card-header'>Manage my network</div>
      <div className='network-menu-card-links'>
        <div
          className='network-menu-card-connections-btn'
          onClick={() => {
            setConnectionsSelected(true);
            setFollowersSelected(false);
            setFollowingSelected(false);
          }}
        >
          <div className='connections-btn-left'>
            <MdPeopleAlt className='network-menu-card-icons' size={20} /> Connections
          </div>
          <div className='connections-btn-right'>{Object.keys(connections).length}</div>
        </div>

        <div
          className='network-menu-card-followers-btn'
          onClick={() => {
            setConnectionsSelected(false);
            setFollowersSelected(true);
            setFollowingSelected(false);
          }}
        >
          <div className='followers-btn-left'>
            <MdPerson className='network-menu-card-icons' size={20} /> Followers
          </div>
          <div className='followers-btn-right'>{Object.keys(followers).length}</div>
        </div>

        <div
          className='network-menu-card-following-btn'
          onClick={() => {
            setConnectionsSelected(false);
            setFollowersSelected(false);
            setFollowingSelected(true);
          }}
        >
          <div className='following-btn-left'>
            <MdPerson className='network-menu-card-icons' size={20}/> Following
          </div>
          <div className='following-btn-right'>{Object.keys(following).length}</div>
        </div>
      </div>
    </div>
  );
};

export default NetworkMenuCard;
