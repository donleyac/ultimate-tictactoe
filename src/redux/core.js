import {Iterable, fromJS, List, Map,is} from 'immutable';
import {winningCells, SIGNS} from './consts.js';

export const INITIAL_STATE = Map();
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
export function userJoinedRoom(state, username) {
  return state.updateIn(["room", "users"],
  0,
  existingUsers=>existingUsers.push(username));
}
export function message(state,username, message){
  return state.updateIn(["room", "chat"],
  0,
  chat=>chat.push(List([username,message])));
}
export function userLeftRoom(state, username){
  if(state.getIn())
}

export function leaveRoom(state, room, user) {
  let roomState;
  //Remove them from their game if its in the room
  if(state.getIn(["rooms", room, "game"])){
    roomState = leaveGame(state, room, user);
  }
  else {
    roomState = state;
  }
  if(roomState.getIn("rooms", room, "users")){
    return roomState.updateIn(["rooms", room, "users"],
    0,
    existingUsers=> {
      for(let i=0; i<existingUsers.count(); i++){
        if(existingUsers.get(i)===user){
          return existingUsers.delete(i);
        }
      }
    });
  }
  return roomState;
}
//Game info needs to go through server for validation, should not validate on client
export function startGame(state, room) {
  let board = new Array(9).fill({
    grid: new Array(9).fill(0),
    selectable: true,
    winner: 0
  });
  return state.setIn(["rooms", room, "game"], Map({
    board: fromJS(board),
    winner: 0,
    activePlayer: 1,
    minPlayers: 2,
    players: Map()
  }));
}
export function joinGame(state, room, user){
  let minPlayers = state.getIn(["rooms", room,"game", "minPlayers"]);
  let joinedState = state.updateIn(
    ["rooms", room, "game", "players"],
    0,
    players=>{
      //TODO add logic that checks if user is in players before adding them
      return players.set(user, null);
    }
  )
  let players = joinedState.getIn(["rooms",room,"game","players"]);
  if(minPlayers===players.count()){
    //TODO create better mapping function, maybe take depending on game mode
    let assignedPl = players.mapEntries(([k,v], index) => {
      if(index==0){
        return [k, -1];
      }
      return [k, 1]
    });
    return joinedState.setIn(["rooms", room,"game","players"], assignedPl);
  }
  return joinedState;
}
export function leaveGame(state, room, user){
  console.log("leaveGame", state);
  let removedState = state.updateIn(
    ["rooms", room, "game", "players"],
    0,
    players=>{
      return players.delete(user);
    }
  )
  return removedState;
}

export function placePiece(state, room, grid, cell, playerId) {
  // const roomPath = ["rooms", room];
  // const boardPath = roomPath.push("game", "board");
  // const gridPath = boardPath.push(grid, "grid");
  // const cellPath = gridPath.push(cell);

  let chosenCell = state.getIn(["rooms", room,"game","board",grid,"grid",cell]);
  if(playerId===state.getIn(["rooms", room,"game","activePlayer"]) && chosenCell===0){
    //Place Piece in cells
    let placed = state.updateIn(
      ["rooms", room, "game","board", grid, "grid", cell],
      0,
      cell => playerId
    );
    //Check Winner in Grid
    let gridState = placed.getIn(["rooms", room,"game","board", grid,"grid"]);
    let grid_winner = placed.setIn(["rooms", room, "game","board", grid, "winner"],
      checkWinner(gridState));
    //Set selectable
    let selectable = grid_winner.updateIn(
      ["rooms", room,"game","board"],
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
    let boardState = selectable.getIn(["rooms", room,"game","board"]);
    let game_winner = selectable.setIn(["rooms", room,"game","winner"],
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
export function switchPlayer(state, room){
  return state.updateIn(
    ["rooms", room,"game","activePlayer"],
    0,
    player => player*-1
  );
}
