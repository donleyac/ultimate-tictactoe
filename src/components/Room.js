import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Game from './../pages/Game.js';
export class Room extends PureComponent {
  render() {
    return (
      <div>
        <div>
          Chat
        </div>
        {this.props.game
          ?<Game
            room={this.props.room}
            players={this.props.game.get('players')}
            minPlayers={this.props.game.get('minPlayers')}
            board={this.props.game.get('board')}
            winner={this.props.game.get('winner')}
            activePlayer={this.props.game.get('activePlayer')}
          />
          :<button onClick={()=>this.props.startGame(this.props.room)}>Start Game</button>
        }
      </div>
    )
  }
}

Room.PropTypes = {
  room: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  game: PropTypes.object,
  startGame: PropTypes.func.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    game: state.get(ownProps.room).get("game") || null
  };
}
export default connect(mapStateToProps)(Room);
