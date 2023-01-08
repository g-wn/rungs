import { UPDATE_PROFILE } from './session';
/* ---------------------- ACTION CREATORS ---------------------- */

const LOAD_POSTS = 'posts/LOAD_POSTS';
const LOAD_USER_POSTS = 'posts/LOAD_USER_POSTS';
const CREATE_POST = 'posts/CREATE_POST';
const UPDATE_POST = 'posts/UPDATE_POST';
const REMOVE_POST = 'posts/REMOVE_POST';
const LIKE_POST = 'posts/LIKE_POST';
const REMOVE_LIKE = 'posts/REMOVE_LIKE';

const loadPosts = posts => ({
  type: LOAD_POSTS,
  posts
});

const loadUserPosts = userPosts => ({
  type: LOAD_USER_POSTS,
  userPosts
});

const createPost = post => ({
  type: CREATE_POST,
  post
});

const updatePost = post => ({
  type: UPDATE_POST,
  post
});

const removePost = postId => ({
  type: REMOVE_POST,
  postId
});

const likePost = post => ({
  type: LIKE_POST,
  post
});

const removeLike = post => ({
  type: REMOVE_LIKE,
  post
});

/* ---------------------- THUNK CREATORS ----------------------- */

// GET ALL POSTS:
export const getPosts = () => async dispatch => {
  const res = await fetch(`/api/posts`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadPosts(data));
    return data;
  }
  return res;
};

// GET ALL POSTS OF CURRENT USER:
export const getCurrentUserPosts = () => async dispatch => {
  const res = await fetch(`/api/posts/current`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadUserPosts(data));
    return data;
  }
  return res;
};

// ADD A POST:
export const postPost = payload => async dispatch => {
  const res = await fetch(`/api/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(createPost(data));
    return data;
  }
  return await res.json();
};

// UPDATE A POST:
export const putPost = (postId, payload) => async dispatch => {
  const res = await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(updatePost(data));
    return data;
  }
  return await res.json();
};

// DELETE A POST:
export const deletePost = postId => async dispatch => {
  const res = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(removePost(postId));
    return data;
  }
  return res;
};

// LIKE A POST:
export const postLike = postId => async dispatch => {
  const res = await fetch(`/api/likes/${postId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(likePost(data));
    return data;
  }
  return await res.json();
};

// DELETE A LIKE:
export const deleteLike = postId => async dispatch => {
  const res = await fetch(`/api/likes/${postId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(removeLike(data));
    return data;
  }
  return await res.json();
};

/* -------------------------- REDUCER -------------------------- */

const initialState = {};

const postsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_POSTS: {
      return { ...action.posts };
    }
    case LOAD_USER_POSTS: {
      return { ...action.userPosts };
    }
    case CREATE_POST: {
      return { ...state, [action.post.id]: action.post };
    }
    case UPDATE_POST: {
      return { ...state, [action.post.id]: action.post };
    }
    case REMOVE_POST: {
      delete newState[action.postId];
      return newState;
    }
    case LIKE_POST: {
      return { ...state, [action.post.id]: action.post };
    }
    case REMOVE_LIKE: {
      return { ...state, [action.post.id]: action.post };
    }
    case UPDATE_PROFILE: {
      for (let post of Object.values(newState).filter(post => post.ownerId === action.profile.userId)) {
        post.owner.profile = action.profile;
      }
      return newState;
    }
    default:
      return state;
  }
};

export default postsReducer;
