import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
    <>
      <button
        className='single-connection-options-btn'
        onClick={openDrop}
      >
        <SlOptions />
      </button>
      {showDeleteDrop && (
        <div className='connection-delete-dropdown'>
          <button
            className='connection-delete-btn'
            onClick={() => dispatch(deleteFollow(connection.id))}
          >
            Remove connection
          </button>
        </div>
      )}
    </>
  );
};

export default DeleteDropdown;
