import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from './store/session';
import NavBar from './components/nav/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/users/UsersList';
import User from './components/users/User';
import Feed from './components/feed/Feed';
import ProfileCard from './components/feed/profileCard/ProfileCard';
import Network from './components/myNetwork/Network';
import Landing from './components/landing/Landing';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';

function App() {
  const [loaded, setLoaded] = useState(false);
  const currentUser = useSelector(state => state.session.user);
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
      {currentUser && <NavBar />}
      <Switch>
        <Route
          path='/login'
          exact={true}
        >
          <Login />
        </Route>
        <Route
          path='/sign-up'
          exact={true}
        >
          <Signup />
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
          <div className='outer-container'>
            <ProfileCard />
            <Feed />
          </div>
        </ProtectedRoute>
        <ProtectedRoute
          path='/mynetwork'
          exact={true}
        >
          <Network />
        </ProtectedRoute>
        <Route
          path='/'
          exact={true}
        >
          <Landing />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
