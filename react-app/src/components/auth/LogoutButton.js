import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './LogoutButton.css';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async e => {
    await dispatch(logout());
  };

  return (
    <button
      className='logout-btn'
      onClick={onLogout}
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;
