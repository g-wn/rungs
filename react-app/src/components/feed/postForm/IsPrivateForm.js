import { MdOutlineClose, MdPeopleAlt } from 'react-icons/md';
import { BiWorld } from 'react-icons/bi';
import './IsPrivateForm.css';

const IsPrivateForm = ({ isPrivate, setIsPrivate, setShowIsPrivateModal, setShowPostForm }) => {
  return (
    <div className='is-private-form-container'>
      <div className='post-form-header-container'>
        <div className='post-form-header-text'>Who can see your post?</div>
        <div
          className='post-form-header-close-btn'
          onClick={() => {
            setShowIsPrivateModal(false);
            setShowPostForm(false);
          }}
        >
          <MdOutlineClose size={28} />
        </div>
      </div>

      <div className='is-private-form-body'>
        <p className='is-private-form-disclaimer'>
          Your post will be visible on feed, on your profile and in search results.
        </p>
        <div className='is-public-selection-container'>
          <div className='icon-and-text-container'>
            <div className='is-public-selection-icon'><BiWorld size={20}/></div>
            <div className='is-public-selection-text'>TEXT</div>
          </div>
          <div className='is-public-selection-selector'>SELECTION</div>
        </div>
        <div className='is-private-selection-container'>
          <div className='icon-and-text-container'>
            <div className='is-private-selection-icon'><MdPeopleAlt size={20}/></div>
            <div className='is-private-selection-text'>TEXT</div>
          </div>
          <div className='is-private-selection-selector'>SELECTION</div>
        </div>
      </div>
    </div>
  );
};

export default IsPrivateForm;
