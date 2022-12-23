/* ---------------------- ACTION CREATORS ---------------------- */

const LOAD_CONNECTIONS = 'network/LOAD_CONNECTIONS';
const ADD_CONNECTION = 'network/ADD_CONNECTION';
const REMOVE_CONNECTION = 'network/REMOVE_CONNECTION';

const loadConnections = connections => ({
  type: LOAD_CONNECTIONS,
  connections
});

const addConnection = user => ({
  type: ADD_CONNECTION,
  user
});

const removeConnection = userId => ({
  type: REMOVE_CONNECTION,
  userId
});

/* ---------------------- THUNK CREATORS ----------------------- */

// GET ALL CONNECTIONS BY USER ID:
export const getConnections = userId => async dispatch => {
  const res = await fetch(`/api/network/${userId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadConnections(data));
    return data;
  }
  return await res.json();
};

// ADD A CONNECTION BY USER ID:
export const postConnection = userId => async dispatch => {
  const res = await fetch(`/api/network/${userId}`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' }
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addConnection(data));
    return data;
  }
  return await res.json();
};

// REMOVE A CONNECTION BY USER ID:
export const deleteConnection = userId => async dispatch => {
  const res = await fetch(`/api/network/${userId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(removeConnection(userId));
    return data;
  }
  return await res.json();
};

/* -------------------------- REDUCER -------------------------- */

const initialState = {};

const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CONNECTIONS: {
      return { ...action.connections };
    }
    case ADD_CONNECTION: {
      return { ...state, [action.user.id]: action.user };
    }
    case REMOVE_CONNECTION: {
      const newState = { ...state };
      delete newState[action.userId];
      return newState;
    }
    default:
      return state;
  }
};

export default networkReducer;
