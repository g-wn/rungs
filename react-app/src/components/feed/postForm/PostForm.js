import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineClose, MdOutlineArrowDropDown } from 'react-icons/md';
import { BiWorld } from 'react-icons/bi';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { BiSmile } from 'react-icons/bi';
import './PostForm.css';
import { postPost } from '../../../store/posts';
import { IsPrivateModal } from '../../../context/Modal';
import IsPrivateForm from './IsPrivateForm';

const PostForm = ({ setShowPostForm }) => {
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [showIsPrivateModal, setShowIsPrivateModal] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    const newPost = await dispatch(
      postPost({
        body,
        image_url: imageUrl,
        private: isPrivate
      })
    );

    if (newPost) newPost.errors ? setErrors(newPost.errors) : setShowPostForm(false);
  };

  return (
    <form
      className='post-form-container'
      onSubmit={handleSubmit}
    >
      <div className='post-form-header-container'>
        <div className='post-form-header-text'>Create a post</div>
        <div
          className='post-form-header-close-btn'
          onClick={() => setShowPostForm(false)}
        >
          <MdOutlineClose size={28} />
        </div>
      </div>

      <div className='post-form-body-container'>
        <div className='post-form-body-user-details'>
          <div className='post-form-profile-img'></div>
          <div className='post-form-details'>
            <div className='post-form-user-name'>
              {currentUser.firstName} {currentUser.lastName}
            </div>
            <div
              className='post-form-private-select'
              onClick={() => setShowIsPrivateModal(true)}
            >
              <BiWorld size={15} />
              {isPrivate ? 'Connections only' : 'Anyone'}
              <MdOutlineArrowDropDown size={25} />
            </div>
            {showIsPrivateModal && (
              <IsPrivateModal onClose={() => setShowIsPrivateModal(false)}>
                <IsPrivateForm
                  isPrivate={isPrivate}
                  setIsPrivate={setIsPrivate}
                  setShowIsPrivateModal={setShowIsPrivateModal}
                  setShowPostForm={setShowPostForm}
                />
              </IsPrivateModal>
            )}
          </div>
        </div>
        <div className='post-form-text-area'>
          <textarea
            placeholder='What do you want to talk about?'
            value={body}
            onChange={e => setBody(e.target.value)}
          ></textarea>
        </div>
        {errors.length > 0 && (
          <ul className='post-form-errors'>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
        <div className='post-form-emoji-hashtag-container'>
          <div className='post-form-emoji'>
            <BiSmile size={25} />
          </div>
          <div
            className='post-form-hashtag'
            onClick={() => setBody(oldBody => oldBody + '#')}
          >
            Add hashtag
          </div>
        </div>
      </div>

      <div className='post-form-btns-container'>
        <button className='post-form-photo-btn'>
          <HiOutlinePhoto
            className='post-form-photo-icon'
            size={25}
          />
        </button>
        {body.length > 1 ? (
          <button
            className='post-form-submit-btn-blue'
            type='submit'
          >
            Post
          </button>
        ) : (
          <button
            className='post-form-submit-btn-gray'
            disabled
          >
            Post
          </button>
        )}
      </div>
    </form>
  );
};

export default PostForm;
