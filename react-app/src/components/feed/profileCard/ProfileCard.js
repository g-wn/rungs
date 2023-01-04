import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ProfileCard.css';

const ProfileCard = () => {
  const currentUser = useSelector(state => state.session.user);
  const connections = useSelector(state => state.network.connections);

  return (
    <div className='profile-card-container'>
      <img
        src={currentUser.profile.bannerImageUrl}
        alt='Banner Img'
        className='profile-card-banner'
      ></img>
      <div className='profile-card-profile-img'>
        <img
          src={currentUser.profile.profileImageUrl}
          alt='Profile Img'
        />
      </div>
      <div className='profile-card-body'>
        <div className='profile-card-body-text'>
          <div className='profile-card-body-name'>
            {currentUser.firstName} {currentUser.lastName}
          </div>
          <div className='profile-card-body-bio'>
            {currentUser.profile.bio ? currentUser.profile.bio : 'Click here to add a bio...'}
          </div>
        </div>
        <NavLink
          to='/mynetwork'
          className='profile-card-connections-link'
        >
          <div className='connections-link-left'>
            <p>Connections</p>
            <p className='bold'>Grow your network</p>
          </div>
          <div className='connections-link-right bold'>{Object.keys(connections).length}</div>
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileCard;
