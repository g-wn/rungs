import { useDispatch } from 'react-redux';
import { SlLike, SlTrash } from 'react-icons/sl';
import { CiEdit } from 'react-icons/ci';
import './Posts.css';
import { deletePost } from '../../store/posts';

const Post = ({ post, currentUser }) => {
  const dispatch = useDispatch();

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
      <div className='single-post-likes'>This is for like count</div>
      <div className='single-post-footer'>
        <button className='single-post-like-btn'>
          <SlLike className='single-post-like-icon' size={20} /> Like
        </button>
        {+currentUser.id === +post.ownerId && (
          <div className='single-post-user-btns'>
            <button className='single-post-edit-btn'>
              <CiEdit size={29} /> Edit
            </button>
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
