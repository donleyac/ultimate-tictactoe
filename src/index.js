import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import routes from  './routes';
import './index.css';

// Apollo
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Redux
import { Provider } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
import reducer from './redux/reducer.js';

// GraphQL via Apollo
const hasSubscriptionOperation = ({ query: { definitions } }) =>
  definitions.some(
    ({ kind, operation }) =>
      kind === 'OperationDefinition' && operation === 'subscription',
  )

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new WebSocketLink({
    uri:
    'ws://localhost:4010/subscriptions',
    options: { reconnect: true },
  }),
  new HttpLink({
    uri: '/graphql' // Your GraphQL endpoint
  }),
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(window.__APOLLO_STATE__),
});

ReactDOM.render(
  // <Provider store={store}>
  //   <ApolloProvider client={client}>
  //     {routes}
  //   </ApolloProvider>
  // </Provider>,
  <ApolloProvider client={client}>
    {routes}
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();