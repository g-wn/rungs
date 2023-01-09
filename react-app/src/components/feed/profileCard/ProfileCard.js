import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import UpdateImgForm from './UpdateImgForm';
import './ProfileCard.css';
import UpdateBioForm from './UpdateBioForm';

const ProfileCard = () => {
  const currentUser = useSelector(state => state.session.user);
  const network = useSelector(state => state.network);
  const [showProfileImgForm, setShowProfileImgForm] = useState(false);
  const [showBannerImgForm, setShowBannerImgForm] = useState(false);
  const [showAddBioForm, setShowAddBioForm] = useState(false);
  const [showEditBioForm, setShowEditBioForm] = useState(false);

  return (
    <div className='profile-card-container'>
      <div className='profile-card-banner-container'>
        <img
          src={currentUser.profile.bannerImageUrl}
          alt='Banner Img'
          className='profile-card-banner'
        />
        <div className='update-img-form-opener'>
          <div
            id='update-banner-img-btn'
            onClick={() => setShowBannerImgForm(true)}
          >
            <MdOutlinePhotoCamera size={18} />
          </div>
          {showBannerImgForm && (
            <UpdateImgForm
              formType='bannerImg'
              showImgForm={showBannerImgForm}
              setShowImgForm={setShowBannerImgForm}
            />
          )}
        </div>
      </div>

      <div className='profile-card-profile-img-container'>
        <div className='update-profile-img-btn-container'>
          <div className='update-img-form-opener'></div>
          <NavLink
            to={`/users/${currentUser.id}`}
            className='profile-card-profile-img'
          >
            <img
              src={currentUser.profile.profileImageUrl}
              alt='Profile Img'
            />
          </NavLink>
          <div
            id='update-profile-img-btn'
            onClick={() => setShowProfileImgForm(true)}
          >
            <MdOutlinePhotoCamera size={18} />
          </div>
          {showProfileImgForm && (
            <UpdateImgForm
              formType='profileImg'
              showImgForm={showProfileImgForm}
              setShowImgForm={setShowProfileImgForm}
            />
          )}
        </div>
      </div>
      <div className='profile-card-body'>
        <div className='profile-card-body-text'>
          <div className='profile-card-body-name'>
            {currentUser.firstName} {currentUser.lastName}
          </div>
          <div className='profile-card-body-bio'>
            {currentUser.profile.bio ? (
              <div className='update-bio-btn-container'>
                <div className='bio-spacer'></div>
                <div className='profile-card-bio'>{currentUser.profile.bio}</div>
                <CiEdit
                  className='update-bio-btn'
                  onClick={() => setShowEditBioForm(true)}
                  size={18}
                />
              </div>
            ) : (
              <div
                onClick={() => setShowAddBioForm(true)}
                className='no-current-bio'
              >
                Click here to add a bio...
              </div>
            )}
          </div>
          {showAddBioForm ? (
            <UpdateBioForm
              showBioForm={showAddBioForm}
              setShowBioForm={setShowAddBioForm}
            />
          ) : (
            <UpdateBioForm
              showBioForm={showEditBioForm}
              setShowBioForm={setShowEditBioForm}
              profileBio={currentUser.profile.bio}
            />
          )}
        </div>
        <NavLink
          to='/mynetwork'
          className='profile-card-connections-link'
        >
          <div className='connections-link-left'>
            <p>Connections</p>
            <p className='bold'>Grow your network</p>
          </div>
          <div className='connections-link-right bold'>{Object.keys(network.connections).length}</div>
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileCard;
