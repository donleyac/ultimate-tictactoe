import {INITIAL_STATE, setUsername, setRoom,messageReceived, getInitial, startGame, placePiece,switchPlayer, createRoom,joinRoom, leaveRoom, joinGame, leaveGame, INITIAL_STATE} from './core.js';
import {Map} from 'immutable';
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'USERNAME':
      return setUsername(state, action.username);
    case 'ROOM':
      return setRoom(state, action.room);
    case 'MESSAGE_SEND':
      return messageReceived(state, action.username, action.message)
    case 'CREATE_ROOM':
    //TODO need to add validation if game already exists from data store
      return createRoom(state, action.room, action.username);
    case 'JOIN_ROOM':
      return joinRoom(state, action.room, action.username);
    case 'LEAVE_ROOM':
      return leaveRoom(state, action.room, action.username);
    case 'START_GAME':
      return startGame(state, action.room);
    case 'JOIN_GAME':
      return joinGame(state, action.room, action.username);
    case 'LEAVE_GAME':
      return leaveGame(state, action.room, action.username);
    case 'PLACE':
      return placePiece(state, action.room, action.grid, action.cell, action.playerId);
    case 'SWITCH':
      return switchPlayer(state, action.room, action.username);
    default:
      return state;
  }
}
