import {Map} from 'immutable';
export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      console.log(state);
      console.log(action.state);
      return state.merge(state, action.state);
    default:
      return state;
  }
}
