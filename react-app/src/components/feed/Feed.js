import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../store/posts';
import Post from '../posts/Post';
import './Feed.css';
import PostFormOpener from './postForm/PostFormOpener';

const Feed = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const posts = useSelector(state => Object.values(state.posts));
  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getPosts());

    // Set a 0.75s timer to give time for the fetch while displaying a loading dial.
    const loadingTimer = setTimeout(() => setIsLoaded(true), 750);
    return () => clearTimeout(loadingTimer);
  }, [dispatch]);

  return (
    <>
      <div className='post-form-opener'>
        <PostFormOpener />
      </div>
      {isLoaded ? (
        <div className='feed-container'>
          {posts.reverse().map((post, idx) => (
            <Post
              currentUser={currentUser}
              post={post}
              key={idx}
            />
          ))}
        </div>
      ) : (
        <h1>LOADING POSTS...</h1>
      )}
    </>
  );
};

export default Feed;
