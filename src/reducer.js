import {Map} from 'immutable';

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return state.merge(state, action.state);
    default:
      return state;
  }
}
