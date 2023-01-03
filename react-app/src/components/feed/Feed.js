import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../store/posts';
import LoadingWheel from '../loadingWheel/LoadingWheel';
import Post from '../posts/Post';
import './Feed.css';
import PostFormOpener from './postForm/PostFormOpener';

const Feed = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const currentUser = useSelector(state => state.session.user);
  const connections = useSelector(state => state.network.connections);
  const posts = useSelector(state => Object.values(state.posts));

  const filteredPosts = posts.filter(post => {
    return post.ownerId in connections || !post.private || post.ownerId === currentUser.id;
  });

  useEffect(() => {
    dispatch(getPosts());

    // Set a 0.75s timer to give time for the fetch while displaying a loading dial.
    const loadingTimer = setTimeout(() => setIsLoaded(true), 750);
    return () => clearTimeout(loadingTimer);
  }, [dispatch]);

  return (
    <div className='feed-right'>
      <div className='post-form-opener'>
        <PostFormOpener />
      </div>
      {isLoaded ? (
        <div className='feed-container'>
          {filteredPosts.reverse().map((post, idx) => (
            <Post
              currentUser={currentUser}
              post={post}
              key={idx}
            />
          ))}
        </div>
      ) : (
        <LoadingWheel />
      )}
    </div>
  );
};

export default Feed;
