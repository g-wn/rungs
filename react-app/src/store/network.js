/* ---------------------- ACTION CREATORS ---------------------- */

export const LOAD_CONNECTIONS = 'network/LOAD_CONNECTIONS';
export const LOAD_FOLLOWERS = 'network/LOAD_FOLLOWERS';
export const LOAD_FOLLOWING = 'network/LOAD_FOLLOWING';
export const FOLLOW_USER = 'network/FOLLOW_USER';
export const UNFOLLOW_USER = 'network/UNFOLLOW_USER';

const loadConnections = connections => ({
  type: LOAD_CONNECTIONS,
  connections
});

const loadFollowers = followers => ({
  type: LOAD_FOLLOWERS,
  followers
});

const loadFollowing = following => ({
  type: LOAD_FOLLOWING,
  following
});

const followUser = (user, currentUser) => ({
  type: FOLLOW_USER,
  user,
  currentUser
});

const unfollowUser = (user, currentUser) => ({
  type: UNFOLLOW_USER,
  user,
  currentUser
});

/* ---------------------- THUNK CREATORS ----------------------- */

// GET ALL CONNECTIONS BY USER ID:
export const getConnections = userId => async dispatch => {
  const res = await fetch(`/api/network/${userId}/connections`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadConnections(data));
    return data;
  }
  return await res.json();
};

// GET ALL FOLLOWERS BY USER ID:
export const getFollowers = userId => async dispatch => {
  const res = await fetch(`/api/network/${userId}/followers`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadFollowers(data));
    return data;
  }
  return await res.json();
};

// GET ALL FOLLOWING BY USER ID:
export const getFollowing = userId => async dispatch => {
  const res = await fetch(`/api/network/${userId}/following`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadFollowing(data));
    return data;
  }
  return await res.json();
};

// ADD A CONNECTION BY USER ID:
export const postFollow = userId => async dispatch => {
  const res = await fetch(`/api/network/${userId}`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' }
  });

  if (res.ok) {
    const {user, currentUser} = await res.json();
    dispatch(followUser(user, currentUser));
    return user;
  }
  return await res.json();
};

// REMOVE A CONNECTION BY USER ID:
export const deleteFollow = userId => async dispatch => {
  const res = await fetch(`/api/network/${userId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  if (res.ok) {
    const {user, currentUser} = await res.json();
    dispatch(unfollowUser(user, currentUser));
    return user;
  }
  return await res.json();
};

/* -------------------------- REDUCER -------------------------- */

const initialState = { connections: {}, followers: {}, following: {} };

const networkReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_CONNECTIONS: {
      newState.connections = action.connections;
      return newState;
    }
    case LOAD_FOLLOWERS: {
      newState.followers = action.followers;
      return newState;
    }
    case LOAD_FOLLOWING: {
      newState.following = action.following;
      return newState;
    }
    case FOLLOW_USER: {
      newState.following[action.user.id] = action.user;
      if (action.user.id in state.followers) {
        newState.connections[action.user.id] = action.user;
      }
      return newState;
    }
    case UNFOLLOW_USER: {
      delete newState.following[action.user.id];
      if (newState.connections[action.user.id]) delete newState.connections[action.user.id];
      return newState;
    }
    default:
      return state;
  }
};

export default networkReducer;
