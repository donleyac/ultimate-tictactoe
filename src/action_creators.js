export function setState(state) {
  return {type: 'SET_STATE',state};
}
export function createRoom(room, user) {
  return {
    meta: {remote: true},
    type: 'CREATE_ROOM',
    room: room,
    username: user
  }
}
export function joinRoom(room, user) {
  return {
    meta: {remote: true},
    type: 'JOIN_ROOM',
    room: room,
    username: user
  }
}
export function leaveRoom(room, user) {
  return {
    meta: {remote: true},
    type: 'LEAVE_ROOM',
    room: room,
    username: user
  }
}
export function startGame(room) {
  return {
    meta: {remote: true},
    type: 'START_GAME',
    room: room
  };
}
export function joinGame(room, user){
  return {
    meta: {remote: true},
    type: 'JOIN_GAME',
    room: room,
    username: user
  }
}
export function placePiece(room, grid, cell, playerId) {
  return {
    meta: {remote: true},
    type: 'PLACE',
    room: room,
    grid: grid,
    cell: cell,
    playerId: playerId
  };
}
export function switchPlayer(room){
  return {
    meta: {remote: true},
    type: 'SWITCH',
    room: room
  }
}
export function resetGame() {
  return {
    meta: {remote: true},
    type: 'INITIAL_STATE'
  };
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
