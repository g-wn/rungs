import { MdOutlineClose, MdOutlineArrowDropDown } from 'react-icons/md';
import { BiWorld } from 'react-icons/bi'
import './PostForm.css';

const PostForm = ({ setShowPostForm }) => {
  return (
    <div className='post-form-container'>
      <div className='post-form-header-container'>
        <div className='post-form-header-text'>Create a post</div>
        <button
          className='post-form-header-close-btn'
          onClick={() => setShowPostForm(false)}
        >
            <MdOutlineClose size={28}/>
        </button>
      </div>

      <div className='post-form-body-container'>
        <div className='post-form-body-user-details'>
          <div className='post-form-profile-img'></div>
          <div className='post-form-details'>
            <div className='post-form-user-name'>Gray Nance</div>
            <button className='post-form-private-select'>
                <BiWorld size={15}/>
                Anyone
                <MdOutlineArrowDropDown size={25}/>
                </button>
          </div>
        </div>
        <div className="post-form-text-area">
            <textarea placeholder='What do you want to talk about?'></textarea>
        </div>
      </div>

      <div className='post-form-btns-container'>THIS IS THE POST FORM FOOTER/BTNS</div>
    </div>
  );
};

export default PostForm;
