import { useState, useEffect } from 'react';
import { deletePost } from '../../store/posts';
import { CiEdit } from 'react-icons/ci';
import { SlTrash } from 'react-icons/sl';
import { SlOptions } from 'react-icons/sl';
import { useDispatch } from 'react-redux';
import './PostOptions.css';

const PostOptions = ({ post, showPostForm, setShowPostForm }) => {
  const dispatch = useDispatch();
  const [showOptionsDrop, setShowOptionsDrop] = useState(false);

  const openDrop = () => {
    if (showOptionsDrop) return;
    setShowOptionsDrop(true);
  };

  useEffect(() => {
    if (!showOptionsDrop) return;

    const closeDrop = () => {
      setShowOptionsDrop(false);
    };

    document.addEventListener('click', closeDrop);

    return () => document.removeEventListener('click', closeDrop);
  }, [showOptionsDrop]);

  return (
    <div className='post-options-container'>
      <button
        className='post-options-btn'
        onClick={openDrop}
      >
        <SlOptions size={18} />
      </button>
      {showOptionsDrop && (
        <div className='single-post-user-btns'>
          <button
            className='single-post-edit-btn'
            onClick={() => setShowPostForm(true)}
          >
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
  );
};

export default PostOptions;
