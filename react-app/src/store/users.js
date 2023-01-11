import { FOLLOW_USER } from './network';
import { UNFOLLOW_USER } from './network';
import { UPDATE_PROFILE_IMAGES } from './session';
import { UPDATE_PROFILE__BIO } from './session';

/* ---------------------- ACTION CREATORS ---------------------- */
const LOAD_USERS = 'users/LOAD_USERS';

const loadUsers = users => ({
  type: LOAD_USERS,
  users
});
/* ---------------------- THUNK CREATORS ----------------------- */

// GET ALL USERS:
export const getUsers = () => async dispatch => {
  const res = await fetch(`/api/users/`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadUsers(data));
    return data;
  }
  return await res.json();
};
/* -------------------------- REDUCER -------------------------- */
const initialState = {};

const usersReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_USERS: {
      return { ...action.users };
    }
    case FOLLOW_USER:
      newState[action.user.id].followers[action.currentUser.id] = {
        firstName: action.currentUser.firstName,
        lastName: action.currentUser.lastName
      };
      newState[action.currentUser.id].following[action.user.id] = {
        firstName: action.user.firstName,
        lastName: action.user.lastName
      };
      return newState;
    case UNFOLLOW_USER:
      delete newState[action.user.id].followers[action.currentUser.id];
      return newState;
    case UPDATE_PROFILE_IMAGES:
      newState[action.profile.userId].profile = action.profile;
      return newState;
    case UPDATE_PROFILE__BIO:
      newState[action.profile.userId].profile = action.profile;
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
