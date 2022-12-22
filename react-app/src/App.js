import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/nav/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/users/UsersList';
import User from './components/users/User';
import Feed from './components/feed/Feed';
import { authenticate } from './store/session';
import ProfileCard from './components/feed/profileCard/ProfileCard';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route
          path='/login'
          exact={true}
        >
          <LoginForm />
        </Route>
        <Route
          path='/sign-up'
          exact={true}
        >
          <SignUpForm />
        </Route>
        <ProtectedRoute
          path='/users'
          exact={true}
        >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute
          path='/users/:userId'
          exact={true}
        >
          <User />
        </ProtectedRoute>
        <ProtectedRoute
          path='/feed'
          exact={true}
        >
          <div className='feed-outer-container'>
            <ProfileCard />
            <Feed />
          </div>
        </ProtectedRoute>
        <Route
          path='/'
          exact={true}
        >
          <h1>My Home Page</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
