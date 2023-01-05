import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ProfileCard.css';

const ProfileCard = () => {
  const currentUser = useSelector(state => state.session.user);
  const network = useSelector(state => state.network);

  return (
    <div className='profile-card-container'>
      <img
        src={currentUser.profile.bannerImageUrl}
        alt='Banner Img'
        className='profile-card-banner'
      />
      <NavLink to={`/users/${currentUser.id}`} className='profile-card-profile-img'>
        <img
          src={currentUser.profile.profileImageUrl}
          alt='Profile Img'
        />
      </NavLink>
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
          <div className='connections-link-right bold'>{Object.keys(network.connections).length}</div>
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileCard;
