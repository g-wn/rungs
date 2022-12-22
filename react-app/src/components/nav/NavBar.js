import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { BsSearch } from 'react-icons/bs';
import { HiChatBubbleLeftEllipsis } from 'react-icons/hi2';
import { IoHomeSharp } from 'react-icons/io5';
import { MdPeopleAlt, MdOutlineArrowDropDown } from 'react-icons/md';
import './Nav.css';

const NavBar = () => {
  return (
    <nav className='main-nav-bar'>
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
            <HiChatBubbleLeftEllipsis size={24}/>
          </div>
          <div className='nav-messaging-text'>Messaging</div>
        </NavLink>
      </div>
      <div className='nav-right'>
        <div className='nav-bar-drop-down'>
          <div className="nav-bar-drop-down-icon"></div>
          <div className="nav-bar-drop-down-text">Me <MdOutlineArrowDropDown size={20}/></div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
