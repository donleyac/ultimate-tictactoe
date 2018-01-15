export function setState(state) {
  return {type: 'SET_STATE',state};
}
export function resetGame() {
  return {
    type: 'INITIAL_STATE'
  };
}
export function sendMessage(room, message){
  return {
    meta: {remote: true},
    type: 'SEND_MESSAGE_ROOM'
  }
}
export function setUsername(username) {
  return {
    type: 'USERNAME',
    username: username
  };
}
export function setRoom(room) {
  return {
    type: 'ROOM',
    room: room
  };
}
