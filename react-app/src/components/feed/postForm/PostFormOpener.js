import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlinePhoto } from 'react-icons/hi2'; // eslint-disable-line
import { useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import PostForm from './PostForm';
import './PostFormOpener.css';

const PostFormOpener = () => {
  const currentUser = useSelector(state => state.session.user);
  const [showPostForm, setShowPostForm] = useState(false);

  return (
    <>
      <div className='post-form-opener-container'>
        <div className='post-form-opener-input-container'>
          <NavLink
            to={`/users/${currentUser.id}`}
            className='post-form-opener-profile-img'
          >
            <img
              src={currentUser.profile.profileImageUrl}
              alt='Profile Img'
            />
          </NavLink>
          <button
            className='post-form-opener-input'
            onClick={() => setShowPostForm(true)}
          >
            <span>Start a post</span>
          </button>
          {showPostForm && (
            <Modal onClose={() => setShowPostForm(false)}>
              <PostForm setShowPostForm={setShowPostForm} />
            </Modal>
          )}
        </div>
        {/* <div className='post-form-opener-btns-container'>
          <button className='post-form-opener-photo-btn'>
            <HiOutlinePhoto
              className='post-form-opener-photo-icon'
              size={25}
            />{' '}
            Photo
          </button>
        </div> */}
      </div>
    </>
  );
};

export default PostFormOpener;
