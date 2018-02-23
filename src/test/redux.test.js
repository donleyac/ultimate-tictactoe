import {fromJS, List, Map} from 'immutable';
import config from './initial.json';
import lastMoveGame from './lastMoveGame.json';

import {setUsername, message,
  createRoom,joinRoom, leaveRoom, userJoinedRoom, userLeftRoom, 
  createGame, joinGame, leaveGame, startGame,
  placePiece, switchPlayer} from './../redux/action_creators.js';
import reducer from './../redux/reducer.js';

const INITIAL_STATE = reducer();
const setUsernameST = reducer(INITIAL_STATE, setUsername("alex"));
const createRoomST = reducer(setUsernameST, createRoom("apple"));
const userJoinedRoomST = reducer(createRoomST, userJoinedRoom("jake"));
const messageST = reducer(userJoinedRoomST, message("alex","what is up"));
const createGameST = reducer(messageST, createGame());

test('Initial State', () => {
  expect(INITIAL_STATE).toMatchSnapshot();
});
test('Set Username', () => {
  expect(setUsernameST).toMatchSnapshot();
});
test('Create/Join/Leave Room', () => {
  expect(createRoomST).toMatchSnapshot();
  //Join existing room
  const joinRoomST = reducer(setUsernameST, joinRoom(createRoomST.get("room")));
  expect(joinRoomST).toMatchSnapshot();
  const leaveRoomST = reducer(joinRoomST, leaveRoom());
  expect(leaveRoomST).toMatchSnapshot();
});
test('User Join/Left', () => {
  expect(userJoinedRoomST).toMatchSnapshot();
  const userLeftRoomST = reducer(userJoinedRoomST, userLeftRoom("jake"));
  expect(userLeftRoomST).toMatchSnapshot();
  const userRejoinedRoomST = reducer(userLeftRoomST, userJoinedRoom("jake"));
  expect(userRejoinedRoomST).toMatchSnapshot();
});
test('Message', () => {
  expect(messageST).toMatchSnapshot();
});
test('Game Setup', ()=> {
  expect(createGameST).toMatchSnapshot();
  const joinGameST = reducer(createGameST, joinGame("alex"));
  expect(joinGameST).toMatchSnapshot();
  const joinedDoubleST = reducer(joinGameST, joinGame("alex"));
  expect(joinedDoubleST).toMatchSnapshot();
  const anotherJoinedST = reducer(joinGameST, joinGame("jake"));
  expect(anotherJoinedST).toMatchSnapshot();
  const anotherJoinedMaxedST = reducer(anotherJoinedST, joinGame("tim"));
  expect(anotherJoinedMaxedST).toMatchSnapshot();
  const leaveGameST = reducer(anotherJoinedMaxedST, leaveGame("jake"));
  expect(leaveGameST).toMatchSnapshot();
  const rejoinedST = reducer(joinGameST, joinGame("jake"));
  expect(rejoinedST).toMatchSnapshot();
  const startGameST = reducer(rejoinedST, startGame("alex"));
  expect(startGameST).toMatchSnapshot();
  const anotherStartGameST = reducer(startGameST, startGame("jake"));
  expect(anotherStartGameST).toMatchSnapshot();
});
test('Play Game', ()=> {
  const placePieceST = reducer(createGameST, placePiece(0, 0, 1));
  expect(placePieceST).toMatchSnapshot();
  const switchPlayerST = reducer(placePieceST, switchPlayer(1));
  expect(switchPlayerST).toMatchSnapshot();
  const invalidPlayerSwitchST = reducer(switchPlayerST, switchPlayer(1));
  expect(invalidPlayerSwitchST).toMatchSnapshot();
  const notSelectablePlaceST = reducer(switchPlayerST, placePiece(1, 1, -1));
  expect(notSelectablePlaceST).toMatchSnapshot();
  const invalidPlayerPlaceST = reducer(switchPlayerST, placePiece(0, 1, 1));
  expect(invalidPlayerPlaceST).toMatchSnapshot();
  const placePieceAgainST = reducer(switchPlayerST, placePiece(0, 1, -1));
  expect(placePieceAgainST).toMatchSnapshot();
  const invalidWonGridST = reducer(fromJS(lastMoveGame), placePiece(1, 2, 1));
  expect(invalidWonGridST).toMatchSnapshot();
  const winningPieceST = reducer(fromJS(lastMoveGame), placePiece(2, 2, 1));
  expect(winningPieceST).toMatchSnapshot();
});
