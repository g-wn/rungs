import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { putProfileImages } from '../../../store/session';
import { Modal } from '../../../context/Modal';
import { MdOutlineClose } from 'react-icons/md';
import LoadingWheel from '../../loadingWheel/LoadingWheel';

const UpdateImgForm = ({ formType, showImgForm, setShowImgForm }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);

  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleProfileImage = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', profileImage);

    setImageLoading(true);

    const res = await fetch(`/api/posts/images`, {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      const data = await res.json();
      await dispatch(
        putProfileImages(currentUser.profile.id, {
          profile_image_url: data.url,
          banner_image_url: currentUser.profile.bannerImageUrl
        })
      );
      setImageLoading(false);
      setShowImgForm(false);
      setProfileImage(null);
      return data;
    } else {
      const data = await res.json();
      setErrors([data.errors]);
      setImageLoading(false);
    }
  };

  const handleBannerImage = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', bannerImage);

    setImageLoading(true);

    const res = await fetch(`/api/posts/images`, {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      const data = await res.json();
      await dispatch(
        putProfileImages(currentUser.profile.id, {
          profile_image_url: currentUser.profile.profileImageUrl,
          banner_image_url: data.url
        })
      );
      setImageLoading(false);
      setShowImgForm(false);
      setProfileImage(null);
      return data;
    } else {
      const data = await res.json();
      setErrors([data.errors]);
      setImageLoading(false);
    }
  };

  const updateProfileImage = e => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const updateBannerImage = e => {
    const file = e.target.files[0];
    setBannerImage(file);
  };

  return (
    <>
      {showImgForm && (
        <Modal onClose={() => setShowImgForm(false)}>
          <form
            onSubmit={formType === 'profileImg' ? handleProfileImage : handleBannerImage}
            id='update-profile-img-form'
            className='img-upload-form-container'
          >
            <div className='post-form-header-container'>
              <div className='post-form-header-text'>
                Edit your {formType === 'profileImg' ? 'profile' : 'banner'} photo
              </div>
              <div
                className='post-form-header-close-btn'
                onClick={() => setShowImgForm(false)}
              >
                <MdOutlineClose size={28} />
              </div>
            </div>

            {imageLoading ? (
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
                  Select image to share
                </label>
                <input
                  id='post-photo-upload'
                  type='file'
                  accept='image/*'
                  onChange={formType === 'profileImg' ? updateProfileImage : updateBannerImage}
                />
              </div>
            )}
            <div className='upload-img-form-btns'>
              <button
                className='is-private-back-btn'
                onClick={() => setShowImgForm(false)}
                type='button'
              >
                Back
              </button>
              {profileImage || bannerImage ? (
                <button
                  className='is-private-save-btn-blue'
                  onClick={formType === 'profileImg' ? handleProfileImage : handleBannerImage}
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
    </>
  );
};

export default UpdateImgForm;
