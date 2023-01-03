import { NavLink } from 'react-router-dom';
import LoginForm from '../auth/LoginForm'
import './Login.css';

const Login = () => {
  return (
    <div className='login-page-container'>
        <nav className="login-page-nav">
            <NavLink to='/feed'>ICON</NavLink>
        </nav>
      <div className='login-page-form-container'>
        <header className="login-page-form-header">
            <h1>Sign in</h1>
            <p>Stay updated on your professional world</p>
        </header>
        <div className="login-page-form-body">
            <LoginForm />
        </div>
      </div>
      <div className='redirect-to-signup-container'>
        <span>New to Rungs? </span>
        <NavLink to='/sign-up'>Join now</NavLink>
      </div>
    </div>
  );
};

export default Login;
