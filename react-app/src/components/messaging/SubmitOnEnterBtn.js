import './SubmitOnEnterBtn.css';

const SubmitOnEnterBtn = ({ active, buttonType, title, message, setSubmitOnEnter }) => {
  return (
    <div
      className='submit-on-enter-btn-container'
      onClick={buttonType === 'enter' ? () => setSubmitOnEnter(true) : () => setSubmitOnEnter(false)}
    >
      <span className={active ? 'circle-green' : 'circle-gray'} />
      <div>
        <p className='bold'>{title}</p>
        <p className='light-text'>{message}</p>
      </div>
    </div>
  );
};

export default SubmitOnEnterBtn;
