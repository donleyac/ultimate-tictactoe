import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {setState} from './action_creators';
import io from 'socket.io-client';
import routes from './routes.js';
import reducer from './reducer';
import socketMiddleware from './socketMiddleware.js';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

const socket = io(`${window.location.protocol}//${window.location.hostname}:8090`);
const createStoreWithMiddleware = applyMiddleware(
  socketMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);

socket.on('state', state =>
  store.dispatch(setState(state))
);

registerServiceWorker();
ReactDOM.render(
<Provider store={store}>
    {routes}
</Provider>, document.getElementById('root'));
