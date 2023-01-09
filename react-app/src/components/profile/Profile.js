import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postFollow } from '../../store/network';
import { Modal } from '../../context/Modal';
import { AiOutlineMail } from 'react-icons/ai';
import { BsLinkedin } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineClose, MdOutlinePhotoCamera } from 'react-icons/md';
import FollowerFollowing from './FollowerFollowing';
import UpdateImgForm from '../feed/profileCard/UpdateImgForm';
import UpdateBioForm from '../feed/profileCard/UpdateBioForm';
import MailTo from './MailTo';
import Post from '../posts/Post';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const [showContactModal, setShowContactModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showProfileImgForm, setShowProfileImgForm] = useState(false);
  const [showBannerImgForm, setShowBannerImgForm] = useState(false);
  const [showAddBioForm, setShowAddBioForm] = useState(false);
  const [showEditBioForm, setShowEditBioForm] = useState(false);

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
        >
          <div
            id='update-banner-img-btn-profile-page'
            onClick={() => setShowBannerImgForm(true)}
          >
            <MdOutlinePhotoCamera size={25} />
          </div>
          {showBannerImgForm && (
            <UpdateImgForm
              formType='bannerImg'
              showImgForm={showBannerImgForm}
              setShowImgForm={setShowBannerImgForm}
            />
          )}
        </div>
        <div className='user-profile-profile-img'>
          <img
            src={user.profile?.profileImageUrl}
            alt='Profile Img'
          />
          {+currentUser.id === +userId && (
            <div
              id='update-profile-img-btn-profile-page'
              onClick={() => setShowProfileImgForm(true)}
            >
              <MdOutlinePhotoCamera size={25} />
            </div>
          )}
          {showProfileImgForm && (
            <UpdateImgForm
              formType='profileImg'
              showImgForm={showProfileImgForm}
              setShowImgForm={setShowProfileImgForm}
            />
          )}
        </div>
        <div className='user-profile-user-details'>
          <p className='user-profile-names bold'>
            {user.firstName} {user.lastName}
          </p>
          <div className='user-profile-bio'>
            <div className='bio'>
              {currentUser.profile.bio ? (
                <div className='update-bio-btn-container-profile-page'>
                  <div className='profile-card-bio-profile-page'>{currentUser.profile.bio}</div>
                  <CiEdit
                    className='update-bio-btn-profile-page'
                    onClick={() => setShowEditBioForm(true)}
                    size={18}
                  />
                </div>
              ) : (
                <div
                  onClick={() => setShowAddBioForm(true)}
                  className='no-current-bio'
                >
                  Click here to add a bio...
                </div>
              )}
              {showAddBioForm ? (
                <UpdateBioForm
                  showBioForm={showAddBioForm}
                  setShowBioForm={setShowAddBioForm}
                />
              ) : (
                <UpdateBioForm
                  showBioForm={showEditBioForm}
                  setShowBioForm={setShowEditBioForm}
                  profileBio={currentUser.profile.bio}
                />
              )}
            </div>
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
                    <div>
                      <p className='bold linkedin-icon'>
                        <BsLinkedin
                          style={{ color: 'var(--global-faded-text-color)' }}
                          size={20}
                        />{' '}
                        Your Profile
                      </p>
                      <a href={`/users/${user.id}`}>{`rungs.herokuapp.com/users/${user.id}`}</a>
                    </div>
                    <div>
                      <p className='bold email-icon'>
                        <AiOutlineMail
                          style={{ color: 'var(--global-faded-text-color)' }}
                          size={20}
                        />{' '}
                        Your Email
                      </p>
                      <MailTo
                        mailTo={`mailto:${user.email}`}
                        label={user.email}
                      />
                    </div>
                  </div>
                </div>
              </Modal>
            )}
          </div>
          <div className='user-profile-network'>
            <div className='user-profile-followers-following'>
              <button
                className='followers bold'
                onClick={() => setShowFollowersModal(true)}
              >
                {Object.keys(user.followers).length} followers
              </button>
              {showFollowersModal && (
                <Modal onClose={() => setShowFollowersModal(false)}>
                  <div className='follower-following-modal'>
                    <div className='follower-following-modal-header'>
                      <span>Followers</span>
                      <span
                        className='post-form-header-close-btn'
                        onClick={() => setShowFollowersModal(false)}
                      >
                        <MdOutlineClose size={28} />
                      </span>
                    </div>

                    {Object.values(user.followers).length > 0 ? (
                      <div className='follower-following-modal-body'>
                        {Object.keys(user.followers).map((id, idx) => (
                          <NavLink
                            className='follower-following-link'
                            key={idx}
                            to={`/users/${users[id].id}`}
                          >
                            <FollowerFollowing
                              user={users[id]}
                              setModal={setShowFollowersModal}
                            />
                          </NavLink>
                        ))}
                      </div>
                    ) : (
                      <div className='follower-following-no-users'>No one is following {user.firstName}, yet.</div>
                    )}
                  </div>
                </Modal>
              )}

              <button
                className='following bold'
                onClick={() => setShowFollowingModal(true)}
              >
                {Object.keys(user.following).length} following
              </button>
              {showFollowingModal && (
                <Modal onClose={() => setShowFollowingModal(false)}>
                  <div className='follower-following-modal'>
                    <div className='follower-following-modal-header'>
                      <span>Following</span>
                      <span
                        className='post-form-header-close-btn'
                        onClick={() => setShowFollowingModal(false)}
                      >
                        <MdOutlineClose size={28} />
                      </span>
                    </div>
                    {Object.keys(user.following).length > 0 ? (
                      <div className='follower-following-modal-body'>
                        {Object.keys(user.following).map((id, idx) => (
                          <NavLink
                            activeClassName=''
                            key={idx}
                            to={`/users/${users[id].id}`}
                          >
                            <FollowerFollowing
                              user={users[id]}
                              setModal={setShowFollowingModal}
                            />
                          </NavLink>
                        ))}
                      </div>
                    ) : (
                      <div className='follower-following-no-users'>
                        {user.firstName} isn't following any other users, yet.
                      </div>
                    )}
                  </div>
                </Modal>
              )}
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
};
export default Profile;
