import { useState, useEffect } from 'react';
import { ReactComponent as Logo } from '../../assets/rungs_icon.svg';
import { AiFillLinkedin, AiFillGithub, AiOutlineMail } from 'react-icons/ai';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import './AboutDropdown.css';
import MailTo from '../profile/MailTo';

const AboutDropdown = () => {
  const [showAboutDrop, setShowAboutDrop] = useState(false);

  const openDrop = () => {
    if (showAboutDrop) return;
    setShowAboutDrop(true);
  };

  useEffect(() => {
    if (!showAboutDrop) return;

    const closeDrop = () => {
      setShowAboutDrop(false);
    };

    document.addEventListener('click', closeDrop);

    return () => document.removeEventListener('click', closeDrop);
  }, [showAboutDrop]);

  return (
    <div className='about-drop-container'>
      <div
        className='nav-bar-drop-down'
        onClick={openDrop}
      >
        <div className='about-drop-icon'>
          <BsGrid3X3GapFill size={20} />
        </div>
        <div className='nav-bar-drop-down-text'>
          About <MdOutlineArrowDropDown size={20} />
        </div>
      </div>
      {showAboutDrop && (
        <div className='about-drop-content'>
          <div className='about-drop-header'>
            <Logo className='about-drop-header-icon' />
            <span className='about-drop-name bold'>Rungs</span>
          </div>

          <div className='about-drop-body'>
            <p>This Linkedin clone was created by Gray Nance</p>
            <img
              src='https://media.licdn.com/dms/image/C5603AQE4cn2fWweD8g/profile-displayphoto-shrink_800_800/0/1601444442383?e=1678924800&v=beta&t=kI6pZ8jpsSCBVOZdF7oisVU951q059NmnTWNW3YPPnI'
              alt='Gray Img'
              className='about-img'
            ></img>
            <p>I look forward to any connections or opportunities.</p>
            <span className='about-links'>
              <a
                target='_blank'
                rel='noreferrer'
                href='https://www.linkedin.com/in/gray-nance/'
              >
                <AiFillLinkedin size={25} />
              </a>
              <a
                target='_blank'
                rel='noreferrer'
                href='https://github.com/g-wn'
              >
                <AiFillGithub size={25} />
              </a>
              <MailTo
                mailTo={`mailto:graynance@gmail.com`}
                label={<AiOutlineMail size={25} />}
              />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutDropdown;
