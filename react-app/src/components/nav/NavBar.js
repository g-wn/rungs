import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsSearch } from 'react-icons/bs';
import { HiChatBubbleLeftEllipsis } from 'react-icons/hi2';
import { IoHomeSharp } from 'react-icons/io5';
import { MdPeopleAlt } from 'react-icons/md';
import { ReactComponent as Logo } from '../../assets/rungs_icon.svg';
import { getConnections, getFollowers, getFollowing } from '../../store/network';
import { getUsers } from '../../store/users';
import { getPosts } from '../../store/posts';
import { getChats } from '../../store/chats';
import ProfileDropdown from './ProfileDropdown';
import NotiDropdown from './NotiDropdown';
import SearchBar from './SearchBar';
import FollowerFollowing from '../profile/FollowerFollowing';
import AboutDropdown from './AboutDropdown';
import './Nav.css';

const NavBar = () => {
  const dispatch = useDispatch();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);

  const currentUser = useSelector(state => state.session.user);
  const socket = useSelector(state => state.socket);
  const network = useSelector(state => state.network); // eslint-disable-line
  const users = useSelector(state => state.users); // eslint-disable-line
  const chats = useSelector(state => state.users.chats); //eslint-disable-line

  // HANDLE INITIAL LOAD AND SOCKET NOTIFICATIONS:
  useEffect(() => {
    dispatch(getConnections(currentUser.id));
    dispatch(getFollowers(currentUser.id));
    dispatch(getFollowing(currentUser.id));
    dispatch(getChats());
    dispatch(getPosts());
    dispatch(getUsers());
  }, [dispatch, currentUser.id]);

  useEffect(() => {
    socket.on('notification', notification => {
      setUnreadMessages(notifications => [...notifications, notification]);
    });
  }, [socket, setUnreadMessages]);

  const openSearch = () => {
    if (showSearchBar) return;
    setShowSearchBar(true);
  };

  // HANDLE SEARCH BAR/FUNCTION:
  useEffect(() => {
    if (!showSearchBar) return;

    const closeSearch = () => {
      setShowSearchBar(false);
    };

    document.addEventListener('click', closeSearch, false);
    document.getElementById('nav-search-input').addEventListener(
      'click',
      function (e) {
        e.stopPropagation();
      },
      true
    );

    return () => {
      document.removeEventListener('click', closeSearch, false);
    };
  });

  const onSearchSubmit = async searchQuery => {
    const res = await fetch(`/api/users/search/${searchQuery}`);
    const users = await res.json();
    setSearchResults(current => Object.values(users));
  };

  const clearResults = () => setSearchResults([]);

  return (
    <nav className='main-nav-bar'>
      <div className='main-nav-bar-content'>
        <div className='nav-left'>
          <div className='rungs-main-icon'>
            <NavLink
              to='/feed'
              activeClassName='rungs-main-icon-link'
            >
              <Logo className='main-nav-icon' />
            </NavLink>
          </div>
          <div
            className='nav-search'
            onClick={openSearch}
          >
            <div className='nav-search-icon'>
              <BsSearch size={20} />
            </div>
            <div className='nav-search-text'>Search</div>
          </div>
          {showSearchBar && (
            <SearchBar
              onSearchSubmit={onSearchSubmit}
              clearResults={clearResults}
            ></SearchBar>
          )}
          {searchResults.length > 0 && showSearchBar && (
            <div className='search-results'>
              {searchResults.map((user, idx) => (
                <NavLink
                  activeClassName=''
                  className='individual-search-result'
                  key={idx}
                  onClick={() => setSearchResults([])}
                  to={`/users/${user.id}`}
                >
                  <FollowerFollowing
                    user={user}
                    setModal={setShowSearchBar}
                    search={true}
                  />
                </NavLink>
              ))}
            </div>
          )}
          {!showSearchBar && (
            <>
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
              <NotiDropdown />
              <NavLink
                to='/messaging'
                activeClassName='active'
                className='nav-messaging'
                exact
                onClick={() => setUnreadMessages([])}
              >
                <div className='nav-messaging-icon'>
                  <HiChatBubbleLeftEllipsis size={24} />
                  {unreadMessages.length > 0 && <div className='messages-flag'>{unreadMessages.length}</div>}
                </div>
                <div className='nav-messaging-text'>Messaging</div>
              </NavLink>
            </>
          )}
        </div>
        <div className='nav-right'>
          <ProfileDropdown />
          <AboutDropdown />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
