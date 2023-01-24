import { io } from 'socket.io-client';
let socket;

/* ---------------------- ACTION CREATORS ---------------------- */
const SOCKET_CONNECT = 'socket/SOCKET_CONNECT';
const SOCKET_DISCONNECT = 'socket/SOCKET_DISCONNECT';

const socketConnect = socket => ({
  type: SOCKET_CONNECT,
  socket
});

const disconnectSocket = socket => ({
  type: SOCKET_DISCONNECT
});

/* ---------------------- THUNK CREATORS ----------------------- */
export const createSocket = () => async dispatch => {
  socket = io();

  dispatch(socketConnect(socket));
  return socket
};

export const removeSocket = () => async dispatch => {
  socket.disconnect();

  dispatch(disconnectSocket(socket));
  return socket
};

/* -------------------------- REDUCER -------------------------- */

const initialState = {};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCKET_CONNECT: {
      return action.socket;
    }
    case SOCKET_DISCONNECT: {
      return {};
    }
    default:
      return state;
  }
};

export default socketReducer;
