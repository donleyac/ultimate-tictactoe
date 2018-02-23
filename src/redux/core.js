import {Iterable, fromJS, List, Map,is} from 'immutable';
import {winningCells, SIGNS} from './consts.js';

export const INITIAL_STATE = new Map();
export function setUsername(state, username) {
  return state.set("username", username)
}
export function createRoom(state, room) {
  return state.set("room", new Map({
    id:room,
    chat:new List(),
    users: new List()
  }));
}
export function joinRoom(state, roomState) {
  return state.set("room", fromJS(roomState));
}
export function leaveRoom(state) {
  return state.remove("room");
}
export function userJoinedRoom(state, username) {
  return state.updateIn(["room", "users"],
  0,
  existingUsers=>existingUsers.push(username));
}
export function userLeftRoom(state, username) {
  return state.updateIn(["room", "users"],
  0,
  existingUsers=>{
    let index = existingUsers.findIndex(item=>item===username);
    return index>=0?existingUsers.delete(index):existingUsers;
  });
}
export function message(state,username, message){
  return state.updateIn(["room", "chat"],
  0,
  chat=>chat.push(List([username,message])));
}
export function createGame(state) {
  let board = new Array(9).fill({
    grid: new Array(9).fill(0),
    selectable: true,
    winner: 0
  });
  return state.setIn(["room", "game"], Map({
    board: fromJS(board),
    winner: 0,
    activePlayer: 1,
    playerRange: new List([2,2]),
    players: Map()
  }));
}
//state = ["room","game"]
export function joinGame(state, username){
  let playerRange = state.get("playerRange");
  let players = state.get("players");
  let numPlayers = players.count();
  //Num players less than game max
  if(numPlayers<playerRange.get(1)){
    if(!players.get(username)) {
      return state.set("players", players.set(username, false));
    }
  }
  return state;
}
export function leaveGame(state, username){
  return state.updateIn(
    ["room", "game", "players"],
    0,
    players=>{
      return players.delete(username);
    }
  )
}
//state = ["room","game"]
export function startGame(state, username){
  let playerRange = state.get("playerRange");
  let players = state.get("players");
  let numPlayers = players.count();
  let player = players.get(username);
  //In the game but not ready
  if(player===false){
    let startedPlayerST = state.set("players",players.set(username, true));
    //Assign players: if all players ready and more players than min
    if(_gameAllStart(startedPlayerST.get("players"))
      && numPlayers>=playerRange.get(0)){
      return startedPlayerST.set("players", _assignGamePlayers(players));
    }
    return startedPlayerST;
  }
  return state;
}
function _gameAllStart(players){
  let output = true
  players.forEach(value=>{
    if(!value){
      output = false
    }
  });
  return output;
}
function _assignGamePlayers(players){
  return players.mapEntries(([k,v], index) => {
    if(index==0){
      return [k, -1];
    }
    return [k, 1]
  });
}
export function placePiece(state, grid, cell, playerId) {
  let chosenCell = state.getIn(["room","game","board",grid,"grid",cell]);
  let gridSelectable = state.getIn(["room","game","board",grid,"selectable"]);
  if(playerId===state.getIn(["room","game","activePlayer"]) && chosenCell===0 && gridSelectable){
    //Place Piece in cells
    let placed = state.updateIn(
      ["room", "game","board", grid, "grid", cell],
      0,
      cell => playerId
    );
    //Check Winner in Grid
    let gridState = placed.getIn(["room","game","board", grid,"grid"]);
    let grid_winner = placed.setIn(["room","game","board", grid, "winner"],
      checkWinner(gridState));
    //Set selectable
    let selectable = grid_winner.updateIn(
      ["room","game","board"],
      0,
      board => {
        let new_board = new Array(9);
        board.forEach((elem,g_index)=>{
          //Grid Index Matches Cell Index or
          //Everything but winning grids when won grid chosen
          if((g_index===cell ||
            board.get(cell).get("winner")) &&
            !elem.get("winner")){
            new_board[g_index]=elem.set("selectable", true);
          }
          else {
            new_board[g_index]=elem.set("selectable", false);
          }
        });
        return fromJS(new_board);
      }
    );
    //Check Game Winner and change player
    let boardState = selectable.getIn(["room","game","board"]);
    let game_winner = selectable.setIn(["room","game","winner"],
     checkWinner(boardState));
    return game_winner;
  }
  return state;
}
function checkWinner(board) {
  //Board
  if(Object(board.get(0))===board.get(0)) {
    for(let i = 0; i<board.size-1; i++) {
      const [a,b,c] = winningCells[i];
      if(board.get(a).get("winner") === board.get(b).get("winner") &&
      board.get(b).get("winner") === board.get(c).get("winner") &&
      board.get(c).get("winner") !== SIGNS.EMPTY) {
        return board.get(a).get("winner");
      }
    }
  }
  //Grid
  else {
    for(let i = 0; i<board.size-1; i++) {
      const [a,b,c] = winningCells[i];
      if(board.get(a) === board.get(b) &&
      board.get(b) === board.get(c) &&
      board.get(c) !== SIGNS.EMPTY) {
        return board.get(a);
      }
    }
  }
  return 0;
}
//TODO change so it's specific to room
export function switchPlayer(state, player){
  return state.updateIn(
    ["room","game","activePlayer"],
    0,
    activePlayer => {
      if(activePlayer===player){
        return activePlayer*-1;
      }
      return activePlayer;
    }
  );
}
