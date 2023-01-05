import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { BiWorld, BiPlus } from 'react-icons/bi';
import { MdPeopleAlt } from 'react-icons/md';
import { SlLike } from 'react-icons/sl';
import { postFollow } from '../../store/network';
import { Modal } from '../../context/Modal';
import PostOptions from './PostOptions';
import PostForm from '../feed/postForm/PostForm';
import './Posts.css';
import { deleteLike, postLike } from '../../store/posts';

const Post = ({ post, currentUser }) => {
  const dispatch = useDispatch();
  const [showPostForm, setShowPostForm] = useState(false);
  const following = useSelector(state => state.network.following);

  const handleLike = async () => {
    await dispatch(postLike(post.id));
  };

  const handleRemoveLike = async () => {
    await dispatch(deleteLike(post.id));
  };

  const displayPostLikes = likes => {
    const keys = Object.keys(likes);
    if (keys.length > 1 && +currentUser.id in likes) {
      return `You and ${keys.length - 1} ${keys.length - 1 === 1 ? 'other' : 'others'} like this post.`;
    } else if (keys.length > 1) {
      const randomUser = likes[keys[Math.floor(Math.random() * keys.length)]];
      return `${randomUser.firstName}
              ${randomUser.lastName}
              and ${keys.length - 1} ${keys.length - 1 === 1 ? 'other' : 'others'} like this post.`;
    } else if (keys.length < 1) {
      return '';
    } else if (keys.length === 1 && +keys[0] === +currentUser.id) {
      return 'You like this post.';
    } else {
      return `${likes[keys[0]].firstName} ${likes[keys[0]].lastName} likes this post.`;
    }
  };

  return (
    <div className='single-post-container'>
      <div className='single-post-header'>
        <NavLink
          to={`/users/${post.owner.id}`}
          className='single-post-user-profile-img'
        >
          <img
            src={post.owner.profile.profileImageUrl}
            alt='Profile Img'
          />
        </NavLink>
        <div className='single-post-user-details'>
          <div className='single-post-user-name'>
            {post.owner.firstName} {post.owner.lastName}
          </div>
          <div className='single-post-user-description'>{post.owner.profile.bio}</div>
          <div className='single-post-time-and-private'>
            <div className='single-post-time-since'>
              <TimeAgo date={post.createdAt} />
            </div>
            &bull;
            <div className='single-post-private-icon'>
              {post.private ? <MdPeopleAlt size={15} /> : <BiWorld size={15} />}
            </div>
          </div>
        </div>
        {currentUser.id !== post.ownerId && !(post.ownerId in following) ? (
          <button
            className='single-post-follow-btn'
            onClick={() => dispatch(postFollow(post.ownerId))}
          >
            <div className='single-post-follow-btn-icon'>
              <BiPlus size={24} />
            </div>
            <div>Follow</div>
          </button>
        ) : (
          <div className='single-post-user-details-right-spacer'></div>
        )}
      </div>
      <div className='single-post-body'>{post.body}</div>
      <div className='single-post-image'>
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt='post-img'
          />
        ) : (
          ''
        )}
      </div>
      <div className='single-post-likes'>{displayPostLikes(post.likes)}</div>
      <div className='single-post-footer'>
        <button
          className={currentUser.id in post.likes ? 'single-post-like-btn-blue' : 'single-post-like-btn'}
          onClick={currentUser.id in post.likes ? handleRemoveLike : handleLike}
        >
          <SlLike
            className='single-post-like-icon'
            size={20}
          />{' '}
          Like
        </button>
        {+currentUser.id === +post.ownerId && (
          <PostOptions
            post={post}
            showPostForm={showPostForm}
            setShowPostForm={setShowPostForm}
          />
        )}
        {showPostForm && (
          <Modal onClose={() => setShowPostForm(false)}>
            <PostForm
              setShowPostForm={setShowPostForm}
              formType='edit'
              post={post}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Post;
