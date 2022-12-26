import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getConnections, getFollowers, getFollowing } from '../../store/network';
import './Network.css';
import NetworkInvitations from './networkInvitations/NetworkInvitations';
import NetworkMain from './networkMain/NetworkMain';
import NetworkMenuCard from './networkMenuCard/NetworkMenuCard';

const Network = () => {
  const dispatch = useDispatch();
  const [connectionsSelected, setConnectionsSelected] = useState(true);
  const [followersSelected, setFollowersSelected] = useState(false);
  const [followingSelected, setFollowingSelected] = useState(false);
  const user = useSelector(state => state.session.user);
  const network = useSelector(state => state.network);
  const { connections, followers, following } = network;

  useEffect(() => {
    dispatch(getConnections(user.id));
    dispatch(getFollowers(user.id));
    dispatch(getFollowing(user.id));
  }, [dispatch, user.id]);

  return (
    <div className='network-page-container'>
      <div className='network-left-container'>
        <div className='menu-card-container'>
          <NetworkMenuCard
            connections={connections}
            followers={followers}
            following={following}
            setConnectionsSelected={setConnectionsSelected}
            setFollowersSelected={setFollowersSelected}
            setFollowingSelected={setFollowingSelected}
          />
        </div>
      </div>

      <div className='network-right-container'>
        <div className='invitations-container'>
          <NetworkInvitations />
        </div>
        <div className='main-content-container'>
          {connectionsSelected && <NetworkMain networkCategory={connections} displaying='connections'/>}
          {followersSelected && <NetworkMain networkCategory={followers} displaying='followers'/>}
          {followingSelected && <NetworkMain networkCategory={following} displaying='following'/>}
        </div>
      </div>
    </div>
  );
};

export default Network;
