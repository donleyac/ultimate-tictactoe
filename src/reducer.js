import {Map} from 'immutable';
import {setCollectionPosition} from './core.js';

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return state.merge(state, action.state);
    case 'COLLECTION_POS':
      return setCollectionPosition(state, action.collection, action.position, action.size);
    default:
      return state;
  }
}
