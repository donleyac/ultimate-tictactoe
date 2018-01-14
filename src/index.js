import React from 'react';
import ReactDOM from 'react-dom';
import {composeWithDevTools} from 'redux-devtools-extension';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {setState, setUsername, setRoom} from './action_creators';
import io from 'socket.io-client';
import routes from './routes.js';
import reducer from './reducer';
import socketMiddleware from './socketMiddleware.js';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
//TODO test exporting socket and store so that socket functions can be used in context
const socket = io(`${window.location.protocol}//${window.location.hostname}:8090`);
const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(
  socketMiddleware(socket)
))(createStore);
const store = createStoreWithMiddleware(reducer);

socket.on('state', state =>
  store.dispatch(setState(state))
);
//Clientside disconnect
socket.on('disconnectThatSoc', ()=> {
  store.dispatch(socket.room, socket.username);
  socket.disconnect();
});
//Callback from setUsername
socket.on('usernameSuccess', username=>{
    store.dispatch(setUsername(username))
  }
);
//Callback from createRoom and joinRoom
socket.on('roomSuccess', room => {
  store.dispatch(setRoom(room));
});
registerServiceWorker();
ReactDOM.render(
<Provider store={store}>
    {routes}
</Provider>, document.getElementById('root'));

//TODO move emits out to where they are used
export function emitSetUsername(username) {
  socket.emit('setUsername', username);
}

export function emitCreateRoom(room){
  socket.emit('createRoom', room);
}
export function emitJoinRoom(room){
  socket.emit('joinRoom',room);
}
export function emitLeaveRoom() {
  socket.emit('leaveRoom');
}
export function emitStartGame(){
  socket.emit('startGame');
}
export function emitJoinGame(){
  socket.emit('joinGame');
}
//TODO need to get rid of playerId requirement, take from socket.player
export function emitPlacePiece(grid, cell, playerId){
  socket.emit('placePiece', grid, cell, playerId);
}
//TODO should integrate this into Place Piece
export function emitSwitchPlayer(){
  socket.emit('switchPlayer');
}
