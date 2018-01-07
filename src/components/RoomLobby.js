import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import InputForm from './../components/InputForm.js';

export default class RoomLobby extends PureComponent {
  render() {
    return(
      <div>
        {this.props.rooms.count()>0
          ?this.props.rooms.map((value,key)=> {
            return (<div key={key}>
              <button onClick={()=>this.props.joinRoom(key)}>Join Lobby</button>
              # of People: {value.get("users").count()}
            </div>)
            })
          :<p>No rooms available</p>
        }
        <div>
          <InputForm label="Room Name" submitFunc={this.props.createRoom}/>
        </div>
      </div>
    )
  }
}

RoomLobby.PropTypes = {
  rooms:PropTypes.object.isRequired,
  createRoom: PropTypes.func.isRequired,
  joinRoom: PropTypes.func.isRequired
}
