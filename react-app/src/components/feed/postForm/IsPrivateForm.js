import { useState } from 'react';
import { MdOutlineClose, MdPeopleAlt } from 'react-icons/md';
import { BiWorld } from 'react-icons/bi';
import './IsPrivateForm.css';

const IsPrivateForm = ({ isPrivate, setIsPrivate, setShowIsPrivateModal, setShowPostForm }) => {
  const [anyone, setAnyone] = useState(!isPrivate);
  const [connections, setConnection] = useState(isPrivate);

  const hasChanged = connections;

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
        <div
          className='is-public-selection-container'
          onClick={() => {
            setConnection(false);
            setAnyone(true);
          }}
        >
          <div className='icon-and-text-container'>
            <div className='is-public-selection-icon'>
              <BiWorld size={25} />
            </div>
            <div className='is-public-selection-text'>
              <div className='selection-text-top'>Anyone</div>
              <div className='selection-text-bottom'>Anyone on or off Rungs</div>
            </div>
          </div>
          <div
            className={anyone ? 'is-public-selection-selector-checked' : 'is-public-selection-selector-unchecked'}
          ></div>
        </div>
        <div
          className='is-private-selection-container'
          onClick={() => {
            setAnyone(false);
            setConnection(true);
          }}
        >
          <div className='icon-and-text-container'>
            <div className='is-private-selection-icon'>
              <MdPeopleAlt size={25} />
            </div>
            <div className='is-private-selection-text'>
              <div className='selection-text-top'>Connections only</div>
              <div className='selection-text-bottom'>Connections on Rungs</div>
            </div>
          </div>
          <div
            className={
              connections ? 'is-private-selection-selector-checked' : 'is-private-selection-selector-unchecked'
            }
          ></div>
        </div>
      </div>

      <div className='is-private-form-btns'>
        <button
          className='is-private-back-btn'
          onClick={() => setShowIsPrivateModal(false)}
        >
          Back
        </button>
        {hasChanged === isPrivate ? (
          <button
            className='is-private-save-btn-gray'
            disabled
          >
            Save
          </button>
        ) : (
          <button
            className='is-private-save-btn-blue'
            onClick={() => {
              setIsPrivate(anyone ? false : true)
              setShowIsPrivateModal(false)
            }}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default IsPrivateForm;
