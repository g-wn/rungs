import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      <input
        className='login-form-input-field'
        type='text'
        placeholder='Email'
        value={email}
        onChange={updateEmail}
      />
      <input
        className='login-form-input-field'
        type='password'
        placeholder='Password'
        value={password}
        onChange={updatePassword}
      />
      <span
        className='forgot-password'
        onClick={() => alert("It's probably password...")}
      >
        Forgot password?
      </span>
      <button
        className='login-form-submit-btn'
        type='submit'
      >
        Sign In
      </button>
      <span className='login-form-or-divider'>or</span>
      <button
        className='demo-user-login-btn'
        onClick={handleDemoLogin}
      >
        Sign in with Demo User
      </button>
      <NavLink
        className='login-form-signup-redirect'
        to='/sign-up'
      >
        New to Rungs? Join now
      </NavLink>
    </form>
  );
};

export default LoginForm;
