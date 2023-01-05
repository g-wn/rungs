import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postFollow } from '../../store/network';
import { Modal } from '../../context/Modal';
import { AiOutlineMail } from 'react-icons/ai';
import { BsLinkedin } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';
import MailTo from './MailTo';
import Post from '../posts/Post';
import './Profile.css';

function Profile() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [showContactModal, setShowContactModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const currentUser = useSelector(state => state.session.user);
  const users = useSelector(state => state.users);
  const user = users[userId];
  const posts = useSelector(state => Object.values(state.posts));
  const userPosts = posts.filter(post => +post.ownerId === +userId);

  if (!user) {
    return null;
  }

  return (
    <div className='user-profile-container'>
      <div className='user-profile-details'>
        <div
          className='user-profile-details-header'
          style={{ backgroundImage: `url("${user.profile.bannerImageUrl}")` }}
        />
        <div className='user-profile-profile-img'>
          <img
            src={user.profile?.profileImageUrl}
            alt='Profile Img'
          />
        </div>
        <div className='user-profile-user-details'>
          <p className='user-profile-names bold'>
            {user.firstName} {user.lastName}
          </p>
          <div className='user-profile-bio'>
            <span className='bio'>{user.profile.bio}</span>
            <span
              className='contact-info'
              onClick={() => setShowContactModal(true)}
            >
              Contact info
            </span>
            {showContactModal && (
              <Modal onClose={() => setShowContactModal(false)}>
                <div className='contact-modal-container'>
                  <div className='contact-modal-header'>
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                    <span
                      className='post-form-header-close-btn'
                      onClick={() => setShowContactModal(false)}
                    >
                      <MdOutlineClose size={28} />
                    </span>
                  </div>
                  <div className='contact-modal-body'>
                    <h2>Contact Info</h2>
                    <p>
                      <div className='bold linkedin-icon'><BsLinkedin style={{color: "var(--global-faded-text-color)"}} size={20}/> Your Profile</div>
                      <a href={`/users/${user.id}`}>{`rungs.herokuapp.com/users/${user.id}`}</a>
                    </p>
                    <p>
                      <div className='bold email-icon'><AiOutlineMail style={{color: "var(--global-faded-text-color)"}} size={20}/> Your Email</div>
                      <MailTo
                        mailTo={`mailto:${user.email}`}
                        label={user.email}
                      />
                    </p>
                  </div>
                </div>
              </Modal>
            )}
          </div>
          <div className='user-profile-network'>
            <div className='user-profile-followers-following'>
              <button className='followers bold'>{Object.keys(user.followers).length} followers</button>
              <button className='following bold'>{Object.keys(user.following).length} following</button>
            </div>
            {+currentUser.id !== +userId && !(+userId in currentUser.following) && (
              <button
                className='user-profile-follow-btn bold'
                onClick={() => dispatch(postFollow(user.id))}
              >
                Connect
              </button>
            )}
          </div>
        </div>
      </div>
      <div className='user-profile-activity'>
        {userPosts.length > 0 ? (
          userPosts.map((post, idx) => (
            <Post
              key={idx}
              post={post}
              currentUser={currentUser}
            />
          ))
        ) : (
          <div className='user-profile-no-posts'>{user.firstName} hasn't posted anything, yet.</div>
        )}
      </div>
    </div>
  );
}
export default Profile;
