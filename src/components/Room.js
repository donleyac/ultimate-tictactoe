import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {List} from 'immutable';
import Chat from './Chat.js';

import Game from './../pages/Game.js';
export class Room extends PureComponent {
  render() {
    return (
      <div>
        <p># of People {this.props.users?this.props.users.count():"Loading"}</p>
        <button onClick={()=>this.props.leaveRoom(this.props.room, this.props.username)}>Leave Room</button>
        <Chat
          messages={this.props.chat}/>
        {this.props.game
          ?<Game
            room={this.props.room}
            username={this.props.username}
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
  leaveRoom: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    game: state.getIn(["rooms", ownProps.room, "game"]) || null,
    users: state.getIn(["rooms", ownProps.room, "users"]) || null,
    chat: state.get("chat") || new List()
  };
}
export default connect(mapStateToProps)(Room);
