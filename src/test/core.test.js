import {fromJS, List, Map} from 'immutable';
import config from './initial.json';
import {INITIAL_STATE, setUsername, createRoom, userJoinedRoom, message} from './../redux/core.js';

const setUsernameST = setUsername(INITIAL_STATE, "alex");
const createRoomST = createRoom(setUsernameST, "apple");
const userJoinedRoomST = userJoinedRoom(createRoomST, "jake");
const messageST = message(userJoinedRoomST, "alex","what is up");

test('Initial State', () => {
  expect(INITIAL_STATE).toMatchSnapshot();
});
test('Set Username', () => {
  expect(setUsernameST).toMatchSnapshot();
});
test('Create Room', () => {
  expect(createRoomST).toMatchSnapshot();
});
test('User Joined Room', () => {
  expect(userJoinedRoomST).toMatchSnapshot();
});
test('Message', () => {
  expect(messageST).toEqual(fromJS(config));
});
test('User Left and Rejoined', ()=> {

})
