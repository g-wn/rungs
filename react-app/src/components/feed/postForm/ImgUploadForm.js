import { useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import LoadingWheel from '../../loadingWheel/LoadingWheel';
import './ImgUploadForm.css';

const ImgUploadForm = ({ setImageUrl, setShowPostForm, setShowUploadImgModal }) => {
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const uploadImage = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    setImageLoading(true);

    const res = await fetch(`/api/posts/images`, {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      const data = await res.json();
      setImageLoading(false);
      setImageUrl(data.url);
      setShowUploadImgModal(false);
      return data;
    } else {
      const data = await res.json();
      setErrors([data.errors]);
      setImageLoading(false);
    }
  };

  const updateImage = e => {
    const file = e.target.files[0];
    setImage(file);
  };
  return (
    <div className='img-upload-form-container'>
      <div className='post-form-header-container'>
        <div className='post-form-header-text'>Edit your photo</div>
        <div
          className='post-form-header-close-btn'
          onClick={() => {
            setShowUploadImgModal(false);
            setShowPostForm(false);
          }}
        >
          <MdOutlineClose size={28} />
        </div>
      </div>

      {imageLoading ? (
        <div className='img-upload-form-body'>
          <LoadingWheel />
        </div>
      ) : (
        <div className='img-upload-form-body'>
          <div className='form-errors'>
            {errors.map((error, idx) => (
              <div key={idx}>{error}</div>
            ))}
          </div>
          <label
            className='post-photo-upload'
            htmlFor='post-photo-upload'
          >
            Select image to share
          </label>
          <input
            id='post-photo-upload'
            type='file'
            accept='image/*'
            onChange={updateImage}
          />
        </div>
      )}
      <div className='upload-img-form-btns'>
        <button
          className='is-private-back-btn'
          onClick={() => setShowUploadImgModal(false)}
          type='button'
        >
          Back
        </button>
        {image ? (
          <button
            className='is-private-save-btn-blue'
            onClick={uploadImage}
          >
            Done
          </button>
        ) : (
          <button
            className='is-private-save-btn-gray'
            disabled
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};

export default ImgUploadForm;
