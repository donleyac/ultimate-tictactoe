import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actionCreators from './../redux/action_creators.js';
import {emitTruncateAll} from './../socketClient.js';
import InputForm from './../components/InputForm.js';
import RoomLobby from './../components/RoomLobby.js';
import Room from './../components/Room.js';
import {List, Map} from 'immutable';

export class Multiplayer extends PureComponent {
  constructor(props) {
    super(props);
    //Non-React lifecycle methods no longer have access to this
    this.createUsername = this.createUsername.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.truncateAll = this.truncateAll.bind(this);
  }
  createRoom(room){
    this.props.createRoom(room);
  }
  joinRoom(room){
    this.props.joinRoom(room);
  }
  leaveRoom(){
    this.props.leaveRoom()
  }
  createUsername(username){
    this.props.createUsername(username);
  }
  truncateAll(){
    emitTruncateAll();
  }
  render() {
    return (
      <div>
        <button onClick={()=>this.truncateAll()}>Truncate DB</button>
        {this.props.username
          ?<div>
            {(this.props.room
              ?(<Room
                  room={this.props.room}
                  username={this.props.username}
                  leaveRoom={this.leaveRoom}
                  startGame={this.props.startGame} />)
              :(<RoomLobby
                rooms={this.props.rooms}
                createRoom={this.createRoom}
                joinRoom={this.joinRoom} />))}
            </div>
          :(<InputForm label="Username" submitFunc={this.createUsername}/>)
        }
      </div>
    );
  }
}

Multiplayer.PropTypes = {
  createUsername: PropTypes.func.isRequired
}
function mapStateToProps(state) {
  return {
    username: state.get('username') || null,
    room: state.get('room') || null,
    rooms: state.get('rooms') || new Map()
  };
}

export default connect(mapStateToProps, actionCreators)(Multiplayer);
