import React from 'react';
import ReactDOM from 'react-dom';
import {composeWithDevTools} from 'redux-devtools-extension';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {setState, setUsername, setRoom, createRoom} from './action_creators';
import io from 'socket.io-client';
import routes from './routes.js';
import reducer from './reducer';
import socketMiddleware from './socketMiddleware.js';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

const socket = io(`${window.location.protocol}//${window.location.hostname}:8090`);
const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(
  socketMiddleware(socket)
))(createStore);
const store = createStoreWithMiddleware(reducer);

socket.on('state', state =>
  store.dispatch(setState(state))
);
//Clientside disconnect
socket.on('disconnectThatSoc', function(){
   socket.disconnect();
});
//Callback from setUsername
socket.on('usernameSuccess', username=>
  store.dispatch(setUsername(username))
);
//Callback from createRoom and joinRoom
socket.on('joinSuccess', room => {
  store.dispatch(setRoom(room));
});
registerServiceWorker();
ReactDOM.render(
<Provider store={store}>
    {routes}
</Provider>, document.getElementById('root'));

export function emitSetUsername(username) {
  socket.emit('username', username);
}
export function emitCreateRoom(room) {
  socket.emit('createRoom', room);
}
export function emitJoinRoom(room) {
  socket.emit('joinRoom', room);
}
