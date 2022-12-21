/* ---------------------- ACTION CREATORS ---------------------- */

const LOAD_POSTS = 'posts/LOAD_POSTS';
const LOAD_USER_POSTS = 'posts/LOAD_USER_POSTS';
const CREATE_POST = 'posts/CREATE_POST';

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
    const data = res.json();
    dispatch(createPost(data));
    return data;
  }
  return res;
};

/* -------------------------- REDUCER -------------------------- */

const initialState = {};

const postsReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default postsReducer;
