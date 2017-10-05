import {List} from 'immutable';

export function setCollectionPosition(state, collect,position,size){
  return state.updateIn(
    ["collections", collect, "pos"],
    0,
    value => List(position)
  );
}
