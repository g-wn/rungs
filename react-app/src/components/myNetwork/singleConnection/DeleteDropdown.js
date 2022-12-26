import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa'
import { SlOptions } from 'react-icons/sl';
import { deleteFollow } from '../../../store/network';

const DeleteDropdown = ({ connection }) => {
  const dispatch = useDispatch();
  const [showDeleteDrop, setShowDeleteDrop] = useState(false);

  const openDrop = () => {
    if (showDeleteDrop) return;
    setShowDeleteDrop(true);
  };

  useEffect(() => {
    if (!showDeleteDrop) return;

    const closeDrop = () => {
      setShowDeleteDrop(false);
    };

    document.addEventListener('click', closeDrop);

    return () => document.removeEventListener('click', closeDrop);
  }, [showDeleteDrop]);

  return (
    <div className='single-connection-options-container'>
      <button
        className='single-connection-options-btn'
        onClick={openDrop}
      >
        <SlOptions size={18}/>
      </button>
      {showDeleteDrop && (
        <div className='connection-delete-dropdown'>
          <button
            className='connection-delete-btn'
            onClick={() => dispatch(deleteFollow(connection.id))}
          >
            <FaTrashAlt size={18} />
            Remove connection
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteDropdown;
