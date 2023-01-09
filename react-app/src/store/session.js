import { FOLLOW_USER } from './network';
import { UNFOLLOW_USER } from './network';

/* ---------------------- ACTION CREATORS ---------------------- */

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
export const UPDATE_PROFILE_IMAGES = 'session/UPDATE_PROFILE_IMG/BANNER';
export const UPDATE_PROFILE__BIO = 'session/UPDATE_PROFILE_BIO';

export const setUser = user => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

const updateProfileImages = profile => ({
  type: UPDATE_PROFILE_IMAGES,
  profile
});

const updateProfileBio = profile => ({
  type: UPDATE_PROFILE__BIO,
  profile
});

/* ---------------------- THUNK CREATORS ----------------------- */

export const authenticate = () => async dispatch => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

// LOGIN A USER BY EMAIL AND PASSWORD:
export const login = (email, password) => async dispatch => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

export const logout = () => async dispatch => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

// SIGN UP A NEW USER:
export const signUp = (first_name, last_name, username, email, password) => async dispatch => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      first_name,
      last_name,
      username,
      email,
      password
    })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

// UPDATE A USER'S PROFILE/BANNER IMAGE:
export const putProfileImages = (profileId, payload) => async dispatch => {
  const res = await fetch(`/api/profiles/${profileId}/image`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(updateProfileImages(data));
    return data;
  }
  return await res.json();
};

// UPDATE A USER'S PROFILE BIO:
export const putProfileBio = (profileId, payload) => async dispatch => {
  const res = await fetch(`/api/profiles/${profileId}/bio`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(updateProfileBio(data));
    return data;
  }
  return await res.json();
};

/* -------------------------- REDUCER -------------------------- */

const initialState = { user: null };

export default function reducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case SET_USER: {
      return { user: action.payload };
    }
    case UPDATE_PROFILE_IMAGES: {
      newState.user.profile = action.profile;
      return newState;
    }
    case UPDATE_PROFILE__BIO: {
      newState.user.profile = action.profile;
      return newState;
    }
    case FOLLOW_USER: {
      newState.user.following[action.user.id] = { firstName: action.user.firstName, lastName: action.user.lastName };
      return newState;
    }
    case UNFOLLOW_USER: {
      delete newState.user.following[action.user.id];
      return newState;
    }
    case REMOVE_USER:
      return { user: null };
    default:
      return state;
  }
}
