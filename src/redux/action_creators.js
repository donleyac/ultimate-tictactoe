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
export function startGame() {
  return {
    meta: {remote: true},
    type: 'START_GAME'
  };
}
export function joinGame(){
  return {
    meta: {remote: true},
    type: 'JOIN_GAME'
  }
}
export function leaveGame() {
  return {
    meta: {remote: true},
    type: 'LEAVE_GAME'
  }
}
export function placePiece(grid, cell, playerId) {
  return {
    meta: {remote: true},
    type: 'PLACE',
    grid: grid,
    cell: cell,
    playerId: playerId
  };
}
export function switchPlayer(){
  return {
    meta: {remote: true},
    type: 'SWITCH'
  }
}
export function createUsername(username) {
  return {
    meta: {remote: true},
    type: 'CREATE_USERNAME',
    username: username
  }
}
export function createRoom(room) {
  return {
    meta: {remote: true},
    type: 'CREATE_ROOM',
    room: room
  }
}
export function joinRoom(room) {
  return {
    meta: {remote: true},
    type: 'JOIN_ROOM',
    room: room
  }
}
export function leaveRoom() {
  return {
    meta: {remote: true},
    type: 'LEAVE_ROOM'
  }
}
