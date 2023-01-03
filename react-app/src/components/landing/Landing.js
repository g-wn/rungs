import { useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import LoginForm from '../auth/LoginForm';
import './Landing.css';

const Landing = () => {
  const currentUser = useSelector(state => state.session.user);

  if (currentUser) {
    return <Redirect to={'/feed'} />;
  }

  return (
    <div className='landing-container'>
      <div className='landing-nav-container'>
        <nav className='landing-nav-content'>
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
      </div>
      <div className='landing-section-one-container'>
        <div className='landing-section-one-content'>
          <div className='landing-section-one-left-container'>
            <h1 className='welcome-message'>Welcome to your professional community</h1>
            <div className='landing-login-form-container'>
              <LoginForm />
            </div>
          </div>
          <div className='landing-section-one-right-container'>
            <img
              className='landing-section-one-img'
              src='https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4'
              alt=''
            />
          </div>
        </div>
      </div>
      <div className='landing-section-two-container'>
        <div className='landing-section-two-content'>
          <p>Join your colleagues, classmates, and friends on Rungs.</p>
          <NavLink to='/sign-up' className="landing-get-started-btn">Get Started</NavLink>
        </div>
      </div>
      <footer className='landing-footer'>FOOTER</footer>
    </div>
  );
};

export default Landing;
