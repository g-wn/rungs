import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async e => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleDemoLogin = async e => {
    e.preventDefault();
    const data = await dispatch(login('demo@rungs.io', 'password'));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = e => {
    setEmail(e.target.value);
  };

  const updatePassword = e => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/feed' />;
  }

  return (
    <form
      className='login-form'
      onSubmit={onLogin}
    >
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='email-input-container'>
        <input
          className='login-form-input-field'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='pwd-input-container'>
        <input
          className='login-form-input-field'
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button
          className='show-pwd-btn'
          onClick={() => setShowPassword(!showPassword)}
          type='button'
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <div className='forgot-password'>
        <span onClick={() => alert("It's probably password...")}>Forgot password?</span>
      </div>
      <button
        className='login-form-submit-btn'
        type='submit'
      >
        Sign In
      </button>
      <div className='login-form-or-divider'>
        <span>or</span>
      </div>
      <button
        className='demo-user-login-btn'
        onClick={handleDemoLogin}
      >
        Sign in with Demo User
      </button>
    </form>
  );
};

export default LoginForm;
