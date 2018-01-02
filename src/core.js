import {Map, fromJS} from 'immutable';

export function setUsername(state, username) {
  return state.set('username', username)
}
export function setRoom(state, room) {
  return state.set('room', fromJS(room));
}
export function setAllRooms(state, rooms) {
  if(!state.get('rooms')) {
    return state.set('rooms', fromJS(rooms));
  }
  return state.mergeIn(['rooms'], fromJS(rooms));
}
