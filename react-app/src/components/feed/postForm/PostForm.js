import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineClose, MdOutlineArrowDropDown } from 'react-icons/md';
import { BiWorld } from 'react-icons/bi';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { BiSmile } from 'react-icons/bi';
import './PostForm.css';
import { postPost, putPost } from '../../../store/posts';
import { ImgUploadModal, IsPrivateModal, Modal } from '../../../context/Modal';
import IsPrivateForm from './IsPrivateForm';
import ImgUploadForm from './ImgUploadForm';

const PostForm = ({ setShowPostForm, formType, post }) => {
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [body, setBody] = useState(formType === 'edit' ? post.body : '');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(formType === 'edit' ? post.imageUrl : null);
  const [imageLoading, setImageLoading] = useState(false);
  const [isPrivate, setIsPrivate] = useState(formType === 'edit' ? post.private : false);
  const [showIsPrivateModal, setShowIsPrivateModal] = useState(false);
  const [showUploadImgModal, setShowUploadImgModal] = useState(false);
  const [errors, setErrors] = useState([]);

  const handlePost = async e => {
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

  const handleEdit = async e => {
    e.preventDefault();

    const updatedPost = await dispatch(
      putPost(post.id, {
        body,
        image_url: imageUrl,
        private: isPrivate
      })
    );

    if (updatedPost) updatedPost.errors ? setErrors(updatedPost.errors) : setShowPostForm(false);
  };

  const uploadImage = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    setImageLoading(true);

    const res = await fetch(`/api/posts/images`, {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      const data = await res.json();
      setImageLoading(false);
      return data;
    }
    return await res.json();
  };

  const updateImage = e => {
    const file = e.target.files[0];
    setImageUrl(file);
  };

  return (
    <form
      className='post-form-container'
      onSubmit={formType === 'edit' ? handleEdit : handlePost}
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
        <div className={errors.length > 0 ? 'post-form-text-area-errors' : 'post-form-text-area'}>
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
        <button
          className='post-form-photo-btn'
          onClick={() => setShowUploadImgModal(true)}
          type='button'
        >
          <HiOutlinePhoto
            className='post-form-photo-icon'
            size={25}
          />
        </button>
        {showUploadImgModal && (
          <ImgUploadModal onClose={() => setShowUploadImgModal(false)}>
            <ImgUploadForm
              setImageUrl={setImageUrl}
              setShowUploadImgModal={setShowUploadImgModal}
              setShowPostForm={setShowPostForm}
            />
          </ImgUploadModal>
        )}
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
