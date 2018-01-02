export function setState(state) {
  return {type: 'SET_STATE',state};
}

export function startGame(room) {
  return {
    meta: {remote: true},
    type: 'START_GAME',
    room: room
  };
}

export function placePiece(grid, cell, playerId) {
  return {
    meta: {remote: true},
    type: 'PLACE',
    grid: grid,
    cell: cell,
    player: playerId
  };
}

export function switchPlayer(){
  return {
    meta: {remote: true},
    type: 'SWITCH'
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
