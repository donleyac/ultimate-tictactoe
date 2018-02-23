export function setUsername(username) {
  return {
    type: 'USERNAME',
    username: username
  };
}
export function createRoom(room) {
  return {
    type: 'CREATE_ROOM',
    room: room
  };
}
export function joinRoom(roomST) {
  return {
    type: 'JOIN_ROOM',
    roomST: roomST
  };
}
export function leaveRoom() {
  return {
    type: 'LEAVE_ROOM'
  };
}
export function userJoinedRoom(username) {
  return {
    type: 'USER_JOINED_ROOM',
    username: username
  };
}
export function userLeftRoom(username) {
  return {
    type: 'USER_LEFT_ROOM',
    username: username
  };
}
export function createGame() {
  return {
    type: 'CREATE_GAME'
  };
}
export function joinGame(username) {
  return {
    type: 'JOIN_GAME',
    username: username
  };
}
export function leaveGame(username) {
  return {
    type: 'LEAVE_GAME',
    username: username
  };
}
export function startGame(username) {
  return {
    type: 'START_GAME',
    username: username
  };
}
export function placePiece(grid, cell, playerId) {
  return {
    type: 'PLACE_PIECE',
    grid: grid,
    cell: cell,
    playerId: playerId
  };
}
export function switchPlayer(playerId) {
  return {
    type: 'SWITCH_PLAYER',
    playerId: playerId
  };
}
export function message(username, message) {
  return {
    type: 'MESSAGE',
    username: username,
    message: message
  };
}



// export function joinGame(){
//   return {
//     meta: {remote: true},
//     type: 'JOIN_GAME'
//   }
// }
