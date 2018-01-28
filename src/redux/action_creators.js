export function setState(state) {
  return {type: 'SET_STATE',state};
}
export function resetGame() {
  return {
    type: 'INITIAL_STATE'
  };
}
export function sendMessage(message){
  return {
    meta: {remote: true},
    type: 'MESSAGE_SEND',
    message: message
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

export function messageReceived(username,message) {
  return {
    type: 'MESSAGE_RECEIVED',
    username: username,
    message: message
  }
}
