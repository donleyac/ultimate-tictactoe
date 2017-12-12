import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {setState, setUsername, setRoom} from './action_creators';
import io from 'socket.io-client';
import routes from './routes.js';
import reducer from './reducer';
import socketMiddleware from './socketMiddleware.js';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

//TODO Should retrieve from backend for all room options
import {rooms} from './const.js';

const socket = io(`${window.location.protocol}//${window.location.hostname}:8090`);
const createStoreWithMiddleware = applyMiddleware(
  socketMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);

socket.on('state', state =>
  store.dispatch(setState(state))
);
//Callback from setUsername
socket.on('usernameSuccess', username=> {
  setUsername(username);
});
//Callback from createRoom and joinRoom
socket.on('joinSuccess', room => {
  setRoom(room);
});
registerServiceWorker();
ReactDOM.render(
<Provider store={store}>
    {routes}
</Provider>, document.getElementById('root'));

export function setUsername(username) {
  socket.emit('username', username);
}
export function joinRoom (room) {
  socket.emit('join', room);
}
export function createRoom (room) {
  socket.emit('create', room);
}
