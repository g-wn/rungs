import { NavLink } from 'react-router-dom';
import { ReactComponent as BackgroundSVG } from '../../assets/404-background.svg';
import './404.css';

const NotFound = () => {
  return (
    <div className='not-found-container'>
      <div className='not-found-content'>
        <h2 className='not-found-header'>Page not found</h2>
        <p className='not-found-message'>
          Uh oh, we can't seem to find the page you're looking for. Try going back to the previous page or click below
          to return to your feed.
        </p>
        <NavLink className='return-to-feed bold' to='/feed'>Return to feed</NavLink>
      </div>
      <BackgroundSVG className='background-svg' />
    </div>
  );
};

export default NotFound;
