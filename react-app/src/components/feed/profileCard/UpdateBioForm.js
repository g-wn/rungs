import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import { MdOutlineClose } from 'react-icons/md';
import { putProfileBio } from '../../../store/session';

const UpdateBioForm = ({ showBioForm, setShowBioForm, profileBio }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);

  const [bio, setBio] = useState(profileBio ? profileBio : '');
  const [errors, setErrors] = useState([]);


  const handleBioUpdate = async e => {
    e.preventDefault();

    const updatedProfile = await dispatch(
      putProfileBio(currentUser.profile.id, {
        bio: bio.trim(),
      })
    );

    if (updatedProfile && updatedProfile.errors) {
      setErrors(updatedProfile.errors);
    } else if (updatedProfile && !updatedProfile.errors) {
      setBio(currentUser.profile.bio);
      setErrors([])
      setShowBioForm(false);
    }
  };

  return (
    <>
      {showBioForm && (
        <Modal onClose={() => setShowBioForm(false)}>
          <form
            onSubmit={handleBioUpdate}
            className='img-upload-form-container'
          >
            {/* ---------- HEADER ---------- */}
            <div className='post-form-header-container'>
              <div className='post-form-header-text'>Edit your bio</div>
              <div
                className='post-form-header-close-btn'
                onClick={() => setShowBioForm(false)}
              >
                <MdOutlineClose size={28} />
              </div>
            </div>

            {/* ---------- BODY ---------- */}
            <div className='img-upload-form-body'>
              <div className='form-errors'>
                {errors.map((error, idx) => (
                  <div key={idx}>{error}</div>
                ))}
              </div>
              <textarea
                className='update-bio-input'
                onChange={e => setBio(e.target.value)}
                placeholder='Enter a new bio...'
                value={bio}
              ></textarea>
            </div>
            {/* ---------- BUTTONS ---------- */}
            <div className='upload-img-form-btns'>
              <button
                className='is-private-back-btn'
                onClick={() => setShowBioForm(false)}
                type='button'
              >
                Back
              </button>
              {bio && bio.length > 2 ? (
                <button
                  className='is-private-save-btn-blue'
                  onClick={handleBioUpdate}
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

export default UpdateBioForm;
