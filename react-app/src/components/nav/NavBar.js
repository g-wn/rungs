import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { HiChatBubbleLeftEllipsis } from 'react-icons/hi2';
import { IoHomeSharp } from 'react-icons/io5';
import { MdPeopleAlt } from 'react-icons/md';
import './Nav.css';
import ProfileDropdown from './ProfileDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getConnections, getFollowers, getFollowing } from '../../store/network';

const NavBar = () => {
  const dispatch = useDispatch();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getConnections(currentUser.id));
    dispatch(getFollowers(currentUser.id));
    dispatch(getFollowing(currentUser.id));
  });

  return (
    <nav className='main-nav-bar'>
      <div className='main-nav-bar-content'>
        <div className='nav-left'>
          <div className='rungs-main-icon'>
            <NavLink
              to='/feed'
              activeClassName='rungs-main-icon-link'
            >
              ICON
            </NavLink>
          </div>
          <div className='nav-search'>
            <div className='nav-search-icon'>
              <BsSearch size={20} />
            </div>
            <div className='nav-search-text'>Search</div>
          </div>
          <NavLink
            to='/feed'
            activeClassName='active'
            className='nav-home'
          >
            <div className='nav-home-icon'>
              <IoHomeSharp size={23} />
            </div>
            <div className='nav-home-text'>Home</div>
          </NavLink>
          <NavLink
            to='/mynetwork'
            activeClassName='active'
            className='nav-network'
          >
            <div className='nav-network-icon'>
              <MdPeopleAlt size={25} />
            </div>
            <div className='nav-network-text'>My Network</div>
          </NavLink>
          <NavLink
            to='/messaging'
            activeClassName='active'
            className='nav-messaging'
            exact
          >
            <div className='nav-messaging-icon'>
              <HiChatBubbleLeftEllipsis size={24} />
            </div>
            <div className='nav-messaging-text'>Messaging</div>
          </NavLink>
        </div>
        <div className='nav-right'>
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
