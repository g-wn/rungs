import './FollowerFollowing.css';

const FollowerFollowing = ({ user, setModal, search }) => {
  return (
    <div
      className='follower-following-ind-container'
      onClick={() => setModal(false)}
      style={search && { border: 'none' }}
    >
      <div className='follower-following-ind-profile-img'>
        <img
          src={user.profile.profileImageUrl}
          alt='Profile Img'
        />
      </div>
      <div className='follower-following-ind-details'>
        <div className='follower-following-ind-name bold'>
          {user.firstName} {user.lastName}
        </div>
        <div className='follower-following-ind-bio'>{user.profile.bio}</div>
      </div>
    </div>
  );
};

export default FollowerFollowing;
