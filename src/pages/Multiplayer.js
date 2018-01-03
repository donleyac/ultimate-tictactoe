import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actionCreators from './../action_creators.js';
import {emitSetUsername, emitJoinRoom, emitCreateRoom} from './../index.js'
import InputForm from './../components/InputForm.js';
import RoomLobby from './../components/RoomLobby.js';
import Room from './../components/Room.js';
import {List, Map} from 'immutable';

export class Multiplayer extends PureComponent {
  constructor(props) {
    super(props);
    //Non-React lifecycle methods no longer have access to this
    this.setUsername = this.setUsername.bind(this);
  }
  setUsername(username){
    emitSetUsername(username);
  }
  render() {
    return (
      <div>
        {this.props.username
          ?<div>
            {(this.props.room
              ?(<Room
                  room={this.props.room}
                  username={this.props.username}
                  startGame={this.props.startGame} />)
              :(<RoomLobby rooms={this.props.rooms} />))}
            </div>
          :(<InputForm label="Username" submitFunc={this.setUsername}/>)
        }
      </div>
    );
  }
}

Multiplayer.PropTypes = {
  setUsername: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired
}
function mapStateToProps(state) {
  return {
    username: state.get('username') || null,
    room: state.get('room') || null,
    rooms: state.get('rooms') || new Map()
  };
}

export default connect(mapStateToProps, actionCreators)(Multiplayer);
