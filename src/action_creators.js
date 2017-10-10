export function setState(state) {
  return {type: 'SET_STATE',state};
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

export function resetGame() {
  return {
    meta: {remote: true},
    type: 'RESET'
  };
}
