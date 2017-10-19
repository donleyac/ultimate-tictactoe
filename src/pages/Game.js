import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from './../action_creators.js';
import BigGrid from './../components/BigGrid.js';

export class Game extends PureComponent {
  render() {
    return (
      <div>
        {this.props.winner===0?(<BigGrid placePiece={this.props.placePiece}
            board={this.props.board}
            player={this.props.player}
            playerId={this.props.local_player}
            localSwitch={this.props.localSwitch}
          />): (<div>
            <button onClick={this.props.resetGame}>Reset Game</button>
            Winner: Player {this.props.winner}</div>)
        }
      </div>

    );
  }
}
Game.PropTypes = {
  board:  PropTypes.object.isRequired,
  winner: PropTypes.number.isRequired,
  player: PropTypes.number.isRequired,
  placePiece: PropTypes.func.isRequired,
  localSwitch: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired
}
function mapStateToProps(state) {
  return {
    board: state.get('board') || new List(),
    winner: state.get('winner') || 0,
    player: state.get('player') || 0,
    local_player: state.get('local_player') || 1
  };
}
export default connect(mapStateToProps, actionCreators)(Game);
