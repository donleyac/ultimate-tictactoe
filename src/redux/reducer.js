import {setUsername, setRoom, setAllRooms, messageReceived} from './core.js';
import {Map} from 'immutable';
export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return state.merge(state, action.state);
    case 'USERNAME':
      return setUsername(state, action.username);
    case 'ROOM':
      return setRoom(state, action.room);
    case 'MESSAGE_RECEIVED':
      return messageReceived(state, action.message)
    default:
      return state;
  }
}
