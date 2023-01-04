import { useState, useEffect } from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './ProfileDropdown.css';

const ProfileDropdown = () => {
  const [showProfileDrop, setShowProfileDrop] = useState(false);
  const currentUser = useSelector(state => state.session.user);

  const openDrop = () => {
    if (showProfileDrop) return;
    setShowProfileDrop(true);
  };

  useEffect(() => {
    if (!showProfileDrop) return;

    const closeDrop = () => {
      setShowProfileDrop(false);
    };

    document.addEventListener('click', closeDrop);

    return () => document.removeEventListener('click', closeDrop);
  }, [showProfileDrop]);

  return (
    <div className='main-nav-profile-drop-container'>
      <div
        className='nav-bar-drop-down'
        onClick={openDrop}
      >
        <div className='nav-bar-drop-down-icon'>
          <img src={currentUser.profile.profileImageUrl} alt="Profile Img" />
        </div>
        <div className='nav-bar-drop-down-text'>
          Me <MdOutlineArrowDropDown size={20} />
        </div>
      </div>
      {showProfileDrop && (
        <div className='main-nav-profile-drop-content'>
          <header className='profile-drop-header'>
            <div className='profile-drop-header-user-details'>
              <div className='profile-drop-header-user-img'>
                <img src={currentUser.profile.profileImageUrl} alt="Profile Img" />
              </div>
              <div className='profile-drop-header-user'>
                <div className='profile-drop-header-user-name'>
                  {currentUser.firstName} {currentUser.lastName}
                </div>
                <div className='profile-drop-header-user-bio'>bio</div>
              </div>
            </div>
            <div className='profile-drop-header-profile-btn'>
              <NavLink to={`/users/${currentUser.id}`}>View Profile</NavLink>
            </div>
          </header>
          <div className='profile-drop-btns'>
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
