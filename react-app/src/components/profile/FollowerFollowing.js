import { NavLink } from 'react-router-dom';
import './FollowerFollowing.css';

const FollowerFollowing = ({ user, setModal, search }) => {
  return (
    <div className='follower-following-ind-container' style={search && {border: "none"}}>
      <NavLink
        to={`/users/${user.id}`}
        className='follower-following-ind-profile-img'
        onClick={() => setModal(false)}
      >
        <img
          src={user.profile.profileImageUrl}
          alt='Profile Img'
        />
      </NavLink>
      <div className="follower-following-ind-details">
        <div className="follower-following-ind-name bold">{user.firstName} {user.lastName}</div>
        <div className="follower-following-ind-bio">{user.profile.bio}</div>
      </div>
    </div>
  );
};

export default FollowerFollowing;
