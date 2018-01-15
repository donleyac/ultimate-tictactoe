import React from 'react';
import ReactDOM from 'react-dom';

import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';

import routes from './routes.js';
import reducer from './redux/reducer.js';
import socketMiddleware from './socketMiddleware.js';
import socketClientImpl from './socketClient.js';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import ApolloClient from 'apollo-client';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';


export const socket = io(`${window.location.protocol}//${window.location.hostname}:8090`);
const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(
  socketMiddleware(socket)
))(createStore);
export const store = createStoreWithMiddleware(reducer);
//Socket on and emits
socketClientImpl();
//In prod, we register a service worker to serve assets from local cache.
//May not work on ios devices.
registerServiceWorker();
ReactDOM.render(
<Provider store={store}>
    {routes}
</Provider>, document.getElementById('root'));
