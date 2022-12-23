import { MdOutlineClose } from 'react-icons/md'
import './ImgUploadForm.css'

const ImgUploadForm = ({ setImageUrl, setShowPostForm, setShowUploadImgModal }) => {
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
<div className='is-private-form-btns'>
        <button
          className='is-private-back-btn'
          onClick={() => setShowUploadImgModal(false)}
        >
          Back
        </button>
      </div>
      </div>
    );
}

export default ImgUploadForm;
