import { useEffect, useState } from 'react';
import { SlOptions } from 'react-icons/sl';
import SubmitOnEnterBtn from './SubmitOnEnterBtn';
import './SubmitOnEnterOptions.css';

const SubmitOnEnterOptions = ({ submitOnEnter, setSubmitOnEnter }) => {
  const [showSubmitOnEnterOptions, setSubmitOnEnterOptions] = useState(false);

  const openPop = () => {
    if (showSubmitOnEnterOptions) return;
    setSubmitOnEnterOptions(true);
  };

  useEffect(() => {
    if (!showSubmitOnEnterOptions) return;

    const closePop = () => {
      setSubmitOnEnterOptions(false);
    };

    document.addEventListener('click', closePop);

    return () => document.removeEventListener('click', closePop);
  }, [showSubmitOnEnterOptions]);

  return (
    <div className='show-submit-on-enter-options-container'>
      <button
        className='show-submit-on-enter-options-btn'
        onClick={openPop}
      >
        <SlOptions size={18} />
      </button>
      {showSubmitOnEnterOptions && (
        <div className='submit-on-enter-pop'>
          <SubmitOnEnterBtn
            active={submitOnEnter ? true : false}
            buttonType={'enter'}
            title={'Press Enter to Send'}
            message={'Pressing Enter will send message'}
            setSubmitOnEnter={setSubmitOnEnter}
          />
          <SubmitOnEnterBtn
            active={submitOnEnter ? false : true}
            buttonType={'click'}
            title={'Click Send'}
            message={'Clicking Send will send message'}
            setSubmitOnEnter={setSubmitOnEnter}
          />
        </div>
      )}
    </div>
  );
};

export default SubmitOnEnterOptions;
