import { SlLike, SlTrash } from 'react-icons/sl';
import { CiEdit } from 'react-icons/ci';
import './Posts.css';

const Post = ({ post, currentUser }) => {
  return (
    <div className='single-post-container'>
      <div className='single-post-header'>This is for the header/user info</div>
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
      <div className='single-post-likes'>This is for likes</div>
      <div className='single-post-footer'>
        <div className='single-post-like-btn'>
          <SlLike size={20} /> Like
        </div>
        {+currentUser.id === +post.ownerId && (
          <div className='single-post-user-btns'>
            <div className='single-post-edit-btn'>
              <CiEdit size={29} /> Edit
            </div>
            <div className='single-post-delete-btn'>
              <SlTrash size={20} /> Delete
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
