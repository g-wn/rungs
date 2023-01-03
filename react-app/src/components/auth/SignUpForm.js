import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async e => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(first_name, last_name, username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  // VALIDATE STEP ONE OF SIGNUP FORM:
  const validateStepOne = async e => {
    e.preventDefault();
    if (password === repeatPassword) {
      let data = await dispatch(signUp(first_name, last_name, username, email, password));
      if (data) {
        data = data.filter(error => {
          return error.toLowerCase().includes('email') || error.toLowerCase().includes('password');
        });
        setErrors(data);
        if (!data.length) {
          setStepOne(false);
          setStepTwo(true);
        }
      }
    } else {
      setErrors(['Entered passwords must match.']);
    }
  };

  // VALIDATE STEP TWO OF SIGNUP FORM:
  const validateStepTwo = async e => {
    e.preventDefault();
    let data = await dispatch(signUp(first_name, last_name, username, email, password));
    if (data) {
      data = data.filter(error => {
        return error.toLowerCase().includes('first name') || error.toLowerCase().includes('last name');
      });
      setErrors(data);
      if (!data.length) {
        setStepTwo(false);
        setStepThree(true);
      }
    }
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div className='form-errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      {/* STEP ONE: EMAIL AND PASSWORD: */}
      {stepOne && (
        <div className='signup-step-one'>
          <div>
            <input
              className={
                errors.filter(error => error.toLowerCase().includes('email')).length > 0
                  ? 'form-input-field-errors'
                  : 'form-input-field'
              }
              type='text'
              name='email'
              onChange={e => setEmail(e.target.value)}
              placeholder='Email'
              value={email}
            ></input>
          </div>
          <div>
            <input
              className={
                errors.filter(error => error.toLowerCase().includes('password')).length > 0
                  ? 'form-input-field-errors'
                  : 'form-input-field'
              }
              type='password'
              name='password'
              onChange={e => setPassword(e.target.value)}
              placeholder='Password (6 or more characters)'
              value={password}
            ></input>
          </div>
          {password && (
            <div>
              <input
                className={
                  errors.filter(error => error.toLowerCase().includes('password')).length > 0
                    ? 'form-input-field-errors'
                    : 'form-input-field'
                }
                type='password'
                name='repeat_password'
                onChange={e => setRepeatPassword(e.target.value)}
                placeholder='Repeat password'
                value={repeatPassword}
                required={true}
              ></input>
            </div>
          )}
          <button onClick={validateStepOne}>Agree & Join</button>
        </div>
      )}

      {/* STEP TWO: FIRST AND LAST NAME: */}
      {stepTwo && (
        <div className='signup-step-two'>
          <div>
            <input
              className={
                errors.filter(error => error.toLowerCase().includes('first name')).length > 0
                  ? 'form-input-field-errors'
                  : 'form-input-field'
              }
              type='text'
              name='first_name'
              onChange={e => setFirstName(e.target.value)}
              placeholder='First name'
              value={first_name}
            ></input>
          </div>
          <div>
            <input
              className={
                errors.filter(error => error.toLowerCase().includes('last name')).length > 0
                  ? 'form-input-field-errors'
                  : 'form-input-field'
              }
              type='text'
              name='last_name'
              onChange={e => setLastName(e.target.value)}
              placeholder='Last name'
              value={last_name}
            ></input>
          </div>
          <button onClick={validateStepTwo}>Continue</button>
        </div>
      )}

      {/* STEP THREE: USERNAME/URL NAME: */}
      {stepThree && (
        <div className='signup-step-three'>
          <div>
            <input
              className={
                errors.filter(error => error.toLowerCase().includes('username')).length > 0
                  ? 'form-input-field-errors'
                  : 'form-input-field'
              }
              type='text'
              name='username'
              onChange={e => setUsername(e.target.value)}
              placeholder='User name'
              value={username}
            ></input>
          </div>
          <button type='submit'>Sign Up</button>
        </div>
      )}
    </form>
  );
};

export default SignUpForm;
