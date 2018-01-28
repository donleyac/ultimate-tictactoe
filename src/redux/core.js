import {Map, List, fromJS} from 'immutable';

export function setUsername(state, username) {
  return state.set('username', username)
}
export function setRoom(state, room) {
  //Need to buid initial chat state
  let chatState = state.set('chat', new List());
  return chatState.set('room', fromJS(room));
}
export function setAllRooms(state, rooms) {
  if(!state.get('rooms')) {
    return state.set('rooms', fromJS(rooms));
  }
  return state.mergeIn(['rooms'], fromJS(rooms));
}
//TODO make chat specific to room
export function messageReceived(state,message){
  let room = state.get('room');
  let chat = state.get('chat').push(message);
  let newState =  state.set('chat', chat);
  return newState;
}
