import {Map} from 'immutable';
import {INITIAL_STATE, setUsername, message,
  createRoom,joinRoom, leaveRoom, userJoinedRoom, userLeftRoom, 
  createGame, joinGame, leaveGame, startGame,
  placePiece, switchPlayer} from './core';
import { create } from 'domain';
export default function(state = INITIAL_STATE, action={}) {
  let pathST;
  const GAME_PATH = ["room", "game"];
  switch (action.type) {
    case 'USERNAME':
      return setUsername(state, action.username);
    case 'CREATE_ROOM':
      return createRoom(state, action.room);
    case 'JOIN_ROOM':
      return joinRoom(state, action.roomST);
    case 'LEAVE_ROOM':
      return leaveRoom(state);    
    case 'USER_JOINED_ROOM':
      return userJoinedRoom(state, action.username);
    case 'USER_LEFT_ROOM':
      return userLeftRoom(state, action.username);
    case 'CREATE_GAME':
      return createGame(state);
    case 'JOIN_GAME':
      pathST = state.getIn(GAME_PATH);
      return state.setIn(GAME_PATH, joinGame(pathST, action.username));
    case 'LEAVE_GAME':
      return leaveGame(state, action.username);
    case 'START_GAME':
      pathST = state.getIn(GAME_PATH);
      return state.setIn(GAME_PATH, startGame(pathST, action.username));
    case 'PLACE_PIECE':
      pathST = state.getIn(GAME_PATH);
      return state.setIn(GAME_PATH, 
        placePiece(pathST, action.grid, action.cell, action.playerId));
    case 'SWITCH_PLAYER':
      pathST = state.getIn(GAME_PATH);
      return state.setIn(GAME_PATH, switchPlayer(pathST,action.playerId))
    case 'MESSAGE':
      return message(state, action.username, action.message);
    default:
      return state;
  }
}
