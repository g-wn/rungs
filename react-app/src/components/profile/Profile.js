import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Profile.css';
import { postFollow } from '../../store/network';
import Post from '../posts/Post';

function Profile() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const currentUser = useSelector(state => state.session.user);
  const users = useSelector(state => state.users);
  const user = users[userId];
  const posts = useSelector(state => Object.values(state.posts))
  const userPosts = posts.filter(post => +post.ownerId === +userId)

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
            <span className='contact-info'>Contact info</span>
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
        {userPosts.length > 0 ? (userPosts.map((post, idx) => (
          <Post key={idx} post={post} currentUser={currentUser} />
        ))) : (
          <div className='user-profile-no-posts'>{user.firstName} hasn't posted anything, yet.</div>
        )}
      </div>
    </div>
  );
}
export default Profile;
