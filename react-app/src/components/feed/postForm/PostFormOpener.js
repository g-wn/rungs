import { HiOutlinePhoto } from 'react-icons/hi2'
import './PostForm.css'

const PostForm = () => {
    return (
      <>
        <div className='post-form-opener-container'>
          <div className='post-form-opener-input-container'>
            <div className="post-form-opener-profile-img"></div>
            <button className="post-form-opener-input">
                <span>Start a post</span>
            </button>
          </div>
          <div className='post-form-opener-btns-container'>
            <button className="post-form-opener-img-btn">
              <HiOutlinePhoto className='post-form-opener-photo-icon' size={25} /> Photo
            </button>
          </div>
        </div>
      </>
    );
}

export default PostForm;
