import DeleteDropdown from './DeleteDropdown';
import './SingleConnectionCard.css';

const SingleConnectionCard = ({ user, displaying }) => {
  return (
    <div className='single-connection-container'>
      <div className='single-connection-profile-img'>Profile Img</div>
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
        {displaying === 'connections' || displaying === 'following' && (
          <div className='single-connection-options-btn-container'>
            <DeleteDropdown connection={user} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleConnectionCard;
