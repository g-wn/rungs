import { useSelector } from 'react-redux';
import DeleteDropdown from './DeleteDropdown';
import './SingleConnectionCard.css';

const SingleConnectionCard = ({ user, displaying }) => {
  const currentUser = useSelector(state => state.session.user);

  return (
    <div className='single-connection-container'>
      <div className='single-connection-profile-img'>
        <img src={currentUser.profile.profileImageUrl} alt="Profile Img" />
      </div>
      <div className='single-connection-details'>
        <div className='single-connection-name'>
          {user.firstName} {user.lastName}
        </div>
        <div className='single-connection-user-description'>
          Professor of Radiology/Head R & D - Digitization / Chief Responsibility Officer
        </div>
      </div>
      <div className='single-connection-btns'>
        <div className='single-connection-message-btn'>Message</div>
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
