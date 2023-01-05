import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { postFollow } from '../../../store/network';
import DeleteDropdown from './DeleteDropdown';
import './SingleConnectionCard.css';

const SingleConnectionCard = ({ user, displaying, invitation }) => {
  const dispatch = useDispatch();
  return (
    <div className='single-connection-container'>
      <div className='single-connection-left'>
        <NavLink to={`/users/${user.id}`} className='single-connection-profile-img'>
          <img
            src={user.profile.profileImageUrl}
            alt='Profile Img'
          />
        </NavLink>
        <div className='single-connection-details'>
          <div className='single-connection-name'>
            {user.firstName} {user.lastName}
          </div>
          <div className='single-connection-user-description'>{user.profile.bio}</div>
        </div>
      </div>
      <div className='single-connection-btns'>
        <div
          className={invitation ? 'single-connection-accept-btn' : 'single-connection-message-btn'}
          onClick={invitation ? () => dispatch(postFollow(user.id)) : () => console.log('MESSAGE')}
        >
          {invitation ? 'Accept' : 'Message'}
        </div>
        {(displaying === 'connections' || displaying === 'following') && (
          <div className='single-connection-options-btn-container'>
            <DeleteDropdown
              connection={user}
              displaying={displaying}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleConnectionCard;
