import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../store/posts';
import Post from '../posts/Post';
import './Feed.css';

const Feed = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    (async function fetchPosts() {
      const postsObj = await dispatch(getPosts());
      setPosts(Object.values(postsObj));
    })();

    // Set a 0.75s timer to give time for the fetch while displaying a loading dial.
    const loadingTimer = setTimeout(() => setIsLoaded(true), 750);
    return () => clearTimeout(loadingTimer);
  }, [dispatch]);

  return (
    <>
      {isLoaded ? (
        <div className='feed-container'>
          {posts.map((post, idx) => (
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
