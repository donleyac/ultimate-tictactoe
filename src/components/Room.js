import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Game from './../pages/Game.js';
export class Room extends PureComponent {
  render() {
    return (
      <div>
        <div>
          Chat
        </div>
        {this.props.game
          ?<Game room={this.props.room} />
          :<button onClick={()=>this.props.startGame(this.props.room)}>Start Game</button>
        }
      </div>
    )
  }
}

Room.PropTypes = {
  room: PropTypes.string.isRequired,
  startGame: PropTypes.func.isRequired
}
