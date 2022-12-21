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
          <div className='post-form-opener-btns-container'>post-form-opener-btns</div>
        </div>
      </>
    );
}

export default PostForm;
