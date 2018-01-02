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
        {this.props.rooms.entries((room, items)=>{
          return (<div>
            <button>Join Lobby</button>
            # of People: {items.get("people").size()}
          </div>)
        })}
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
