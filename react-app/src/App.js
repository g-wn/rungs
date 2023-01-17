import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client'
import { authenticate } from './store/session';
import NavBar from './components/nav/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Profile from './components/profile/Profile';
import Feed from './components/feed/Feed';
import ProfileCard from './components/feed/profileCard/ProfileCard';
import Network from './components/myNetwork/Network';
import Landing from './components/landing/Landing';
import Messaging from './components/messaging/Messaging';
// import MessagingModal from './components/messaging/MessagingModal';
import NotFound from './components/404/404';

let socket;

function App() {
  const [loaded, setLoaded] = useState(false);
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    socket = io()

    return () => socket.disconnect()
  }, [])

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
      {currentUser && <NavBar socket={socket} />}
      {/* {currentUser && <MessagingModal />} */}
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
          path='/users/:userId'
          exact={true}
        >
          <Profile />
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
        <ProtectedRoute
          path='/messaging'
          exact={true}
        >
          <Messaging socket={socket} />
        </ProtectedRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
