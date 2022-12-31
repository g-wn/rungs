import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import LoginForm from '../auth/LoginForm';
import './Landing.css';

const Landing = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);

  if (currentUser) {
    return <Redirect to={'/feed'} />;
  }

  return (
    <div className='landing-container'>
      <nav className='landing-nav'>
        <div className='landing-nav-icon'>ICON</div>
        <div className='landing-nav-btns'>
          <NavLink
            className='landing-nav-signup-btn'
            to='/sign-up'
          >
            Join Now
          </NavLink>
          <NavLink
            className='landing-nav-login-btn'
            to='/login'
          >
            Sign In
          </NavLink>
        </div>
      </nav>
      <div className='landing-section-one'>
        <div className='landing-secion-one-left-container'>
          <div className='welcome-message'>Welcome to your professional community</div>
          <div className='landing-login-form-container'>
            <LoginForm />
          </div>
        </div>
        <div className='landing-secion-one-right-container'>
          <img
            className='landing-section-one-img'
            src='https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4'
            alt=''
          />
        </div>
      </div>
      <div className='landing-section-two'>SECTION 2</div>
      <footer className='landing-footer'>FOOTER</footer>
    </div>
  );
};

export default Landing;
