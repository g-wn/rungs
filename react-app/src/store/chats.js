/* ---------------------- ACTION CREATORS ---------------------- */

const LOAD_CHAT = 'chats/LOAD_CHAT';
const LOAD_CHATS = 'chats/LOAD_CHATS';
const CREATE_CHAT = 'chats/CREATE_CHAT';
const SEND_MESSAGE = 'chats/SEND_MESSAGE';

const loadChat = chat => ({
  type: LOAD_CHAT,
  chat
});

const loadChats = chats => ({
  type: LOAD_CHATS,
  chats
});

const createChat = chat => ({
  type: CREATE_CHAT,
  chat
});

const sendMessage = message => {
  return {
    type: SEND_MESSAGE,
    message
  };
};

/* ---------------------- THUNK CREATORS ----------------------- */

// GET A SINGLE CHAT:
export const getChat = chatId => async dispatch => {
  const res = await fetch(`/api/chat/${chatId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadChat(data));
    return data;
  }
  return await res.json();
};

// GET ALL CHATS OF CURRENT USER:
export const getChats = () => async dispatch => {
  const res = await fetch(`/api/chat`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadChats(data));
    return data;
  }
};

// CREATE A CHAT:
export const putChat = payload => async dispatch => {
  const res = await fetch(`/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: payload })
  });

  if (res.ok) {
    const data = await res.json();
    if (!('Message' in data)) {
      dispatch(createChat(data));
    }
    return data;
  }
  return await res.json();
};

// SEND A MESSAGE:
export const putMessage = (chatId, payload) => async dispatch => {
  const res = await fetch(`/api/chat/${chatId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(sendMessage(data));
    return data;
  }
  return await res.json();
};

/* -------------------------- REDUCER -------------------------- */

const initialState = {};

const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CHATS: {
      return { ...action.chats };
    }
    case CREATE_CHAT: {
      return { ...state, [action.chat.id]: action.chat };
    }
    case SEND_MESSAGE: {
      const newState = { ...state };
      const chat = newState[action.message.chatId];
      chat.messages.push(action.message);
      return newState;
    }
    default:
      return state;
  }
};

export default chatsReducer;
