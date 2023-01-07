import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import './ProfileCard.css';
import { useEffect, useState } from 'react';
import UpdateImgForm from './UpdateImgForm';

const ProfileCard = () => {
  const currentUser = useSelector(state => state.session.user);
  const network = useSelector(state => state.network);
  const [showImgForm, setShowImgForm] = useState(false);
  // const [errors, setErrors] = useState([]);

  return (
    <div className='profile-card-container'>
      <div className='profile-card-banner-container'>
        <img
          src={currentUser.profile.bannerImageUrl}
          alt='Banner Img'
          className='profile-card-banner'
        />
        <UpdateImgForm
          formType={'bannerImg'}
          setShowImgForm={setShowImgForm}
          showImgForm={showImgForm}
        />
      </div>
      <div className='profile-card-profile-img-container'>
        <div className='update-profile-img-btn-container'>
          <UpdateImgForm
            formType={'profileImg'}
            setShowImgForm={setShowImgForm}
            showImgForm={showImgForm}
          />
          <NavLink
            to={`/users/${currentUser.id}`}
            className='profile-card-profile-img'
          >
            <img
              src={currentUser.profile.profileImageUrl}
              alt='Profile Img'
            />
          </NavLink>
        </div>
      </div>
      <div className='profile-card-body'>
        <div className='profile-card-body-text'>
          <div className='profile-card-body-name'>
            {currentUser.firstName} {currentUser.lastName}
          </div>
          <div className='profile-card-body-bio'>
            {currentUser.profile.bio ? currentUser.profile.bio : 'Click here to add a bio...'}
          </div>
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
