import { NavLink } from 'react-router-dom';
import SignUpForm from '../auth/SignUpForm';
import './Signup.css';

const Signup = () => {
  return (
    <div className='signup-page-container'>
      <nav className='login-signup-page-nav'>
        <NavLink to='/feed'>ICON</NavLink>
      </nav>
      <div className='signup-page-form-container'>
        <header className="signup-page-form-header">
            <h1>Make the most of your professional life</h1>
        </header>
        <div className='signup-page-form-body'>
          <SignUpForm />
        </div>
      </div>
      <div className='redirect-to-signup-or-login-container'>
        <span>Already on Rungs? </span>
        <NavLink to='/login'>Sign In</NavLink>
      </div>
    </div>
  );
};

export default Signup;
