import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {List, is} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from './../action_creator.js';
import BigGrid from './../components/BigGrid.js';

export class Game extends PureComponent {
  render() {
    let board = this.props.board;
    let winner = this.props.winner;
    let player = this.props.player;
    return (
      <BigGrid placePiece={this.props.placePiece} board={this.props.board}/>
    );
  }
}
Game.PropTypes = {
  board:  PropTypes.object.isRequired,
  winner: PropTypes.number.isRequired,
  player: PropTypes.number.isRequired,
  placePiece: PropTypes.func.isRequired
}
function mapStateToProps(state) {
  return {
    board: state.get('board') || new List(),
    winner: state.get('winner') || 0,
    player: state.get('player') || 0
  };
}
export default connect(mapStateToProps, actionCreators)(Game);
