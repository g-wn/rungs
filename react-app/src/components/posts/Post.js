import { useState } from 'react';
import TimeAgo from 'react-timeago';
import { useDispatch, useSelector } from 'react-redux';
import { BiWorld, BiPlus } from 'react-icons/bi';
import { MdPeopleAlt } from 'react-icons/md';
import { SlLike } from 'react-icons/sl';
import { postFollow } from '../../store/network';
import { Modal } from '../../context/Modal';
import PostOptions from './PostOptions';
import PostForm from '../feed/postForm/PostForm';
import './Posts.css';

const Post = ({ post, currentUser }) => {
  const dispatch = useDispatch();
  const [showPostForm, setShowPostForm] = useState(false);
  const following = useSelector(state => state.network.following);

  return (
    <div className='single-post-container'>
      <div className='single-post-header'>
        <div className='single-post-user-profile-img'>
          <img
            src={post.owner.profile.profileImageUrl}
            alt='Profile Img'
          />
        </div>
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
      <div className='single-post-likes'>This is for like count</div>
      <div className='single-post-footer'>
        <button className='single-post-like-btn'>
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
