import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { putProfile, setUser } from '../../../store/session';
import { Modal } from '../../../context/Modal';
import { MdOutlinePhotoCamera, MdOutlineClose } from 'react-icons/md';
import LoadingWheel from '../../loadingWheel/LoadingWheel';

const UpdateImgForm = ({ formType }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const [showProfileImgForm, setShowProfileImgForm] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageLoading, setProfileImageLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleProfileImage = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', profileImage);

    setProfileImageLoading(true);

    const res = await fetch(`/api/posts/images`, {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(
        putProfile(currentUser.profile.id, {
          bio: currentUser.profile.bio,
          profile_image_url: data.url,
          banner_image_url: currentUser.profile.bannerImageUrl
        })
      );
      setProfileImageLoading(false);
      setShowProfileImgForm(false);
      setProfileImage(null);
      return data;
    } else {
      const data = await res.json();
      setErrors([data.errors]);
      setProfileImageLoading(false);
    }
  };

  const updateProfileImage = e => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  return (
    <div className='update-img-form-opener'>
      <div
        className='update-profile-img-btn'
        onClick={() => setShowProfileImgForm(true)}
      >
        <MdOutlinePhotoCamera size={18} />
      </div>
      {showProfileImgForm && (
        <Modal onClose={() => setShowProfileImgForm(false)}>
          <form
            onSubmit={handleProfileImage}
            id='update-profile-img-form'
            className='img-upload-form-container'
          >
            <div className='post-form-header-container'>
              <div className='post-form-header-text'>Edit your photo</div>
              <div
                className='post-form-header-close-btn'
                onClick={() => setShowProfileImgForm(false)}
              >
                <MdOutlineClose size={28} />
              </div>
            </div>

            {profileImageLoading ? (
              <div className='img-upload-form-body'>
                <LoadingWheel />
              </div>
            ) : (
              <div className='img-upload-form-body'>
                <div className='form-errors'>
                  {errors.map((error, idx) => (
                    <div key={idx}>{error}</div>
                  ))}
                </div>
                <label
                  className='post-photo-upload'
                  htmlFor='post-photo-upload'
                >
                  Select images to share
                </label>
                <input
                  id='post-photo-upload'
                  type='file'
                  accept='image/*'
                  onChange={updateProfileImage}
                />
              </div>
            )}
            <div className='upload-img-form-btns'>
              <button
                className='is-private-back-btn'
                onClick={() => setShowProfileImgForm(false)}
                type='button'
              >
                Back
              </button>
              {profileImage ? (
                <button
                  className='is-private-save-btn-blue'
                  onClick={handleProfileImage}
                >
                  Done
                </button>
              ) : (
                <button
                  className='is-private-save-btn-gray'
                  disabled
                >
                  Done
                </button>
              )}
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default UpdateImgForm;
