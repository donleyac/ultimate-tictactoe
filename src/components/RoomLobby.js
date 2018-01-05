import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import InputForm from './../components/InputForm.js';
import {emitCreateRoom} from './../index.js';

export default class RoomLobby extends PureComponent {
  createRoom(roomName) {
    emitCreateRoom(roomName);
  }
  render() {
    return(
      <div>
        {this.props.rooms.count()>0
          ?this.props.rooms.map((value,key)=> {
            return (<div key={key}>
              <button>Join Lobby</button>
              # of People: {value.get("users").count()}
            </div>)
            })
          :<p>No rooms available</p>
        }
        <div>
          <InputForm label="Room Name" submitFunc={this.createRoom}/>
        </div>
      </div>
    )
  }
}

RoomLobby.PropTypes = {
  rooms:PropTypes.object.isRequired
}
