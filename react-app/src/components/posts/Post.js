import { useState } from 'react';
import TimeAgo from 'react-timeago';
import { useDispatch } from 'react-redux';
import { BiWorld, BiPlus } from 'react-icons/bi';
import { CiEdit } from 'react-icons/ci';
import { MdPeopleAlt } from 'react-icons/md';
import { SlLike, SlTrash } from 'react-icons/sl';
import { Modal } from '../../context/Modal';
import PostForm from '../feed/postForm/PostForm';
import { deletePost } from '../../store/posts';
import './Posts.css';

const Post = ({ post, currentUser }) => {
  const [showPostForm, setShowPostForm] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className='single-post-container'>
      <div className='single-post-header'>
        <div className='single-post-user-profile-img'></div>
        <div className='single-post-user-details'>
          <div className='single-post-user-name'>
            {post.owner.firstName} {post.owner.lastName}
          </div>
          <div className='single-post-user-description'>
            Professor of Radiology/Head R & D - Digitization / Chief Responsibility Officer
          </div>
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
        {currentUser.id !== post.ownerId ? (
          <button className='single-post-follow-btn'>
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
          <div className='single-post-user-btns'>
            <button
              className='single-post-edit-btn'
              onClick={() => setShowPostForm(true)}
            >
              <CiEdit size={29} /> Edit
            </button>
            {showPostForm && (
              <Modal onClose={() => setShowPostForm(false)}>
                <PostForm setShowPostForm={setShowPostForm} formType='edit' post={post}/>
              </Modal>
            )}
            <button
              className='single-post-delete-btn'
              onClick={() => dispatch(deletePost(post.id))}
            >
              <SlTrash size={20} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
