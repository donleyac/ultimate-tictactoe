import {socket} from './index.js';
import {store} from './index.js';
import {setState, setUsername, setRoom, messageReceived} from './redux/action_creators.js';


export default function () {
  socket.on('state', state =>
    store.dispatch(setState(state))
  );
  //Clientside disconnect
  socket.on('disconnectThatSoc', ()=> {
    store.dispatch(socket.room, socket.username);
    socket.disconnect();
  });
  //Callback from setUsername
  socket.on('usernameSuccess', username=>{
      store.dispatch(setUsername(username))
    }
  );
  //Callback from createRoom and joinRoom
  socket.on('roomSuccess', room => {
    store.dispatch(setRoom(room));
  });
  //Add incoming messages to rooms
  socket.on('sendMessageClients', message=>{
    console.log('client', message);
    store.dispatch(messageReceived(message));
  });
}

//TODO move emits out to where they are used
export function emitSetUsername(username) {
  socket.emit('setUsername', username);
}
export function emitCreateRoom(room){
  socket.emit('createRoom', room);
}
export function emitJoinRoom(room){
  socket.emit('joinRoom',room);
}
export function emitLeaveRoom() {
  socket.emit('leaveRoom');
}
export function emitStartGame(){
  socket.emit('startGame');
}
export function emitJoinGame(){
  socket.emit('joinGame');
}
//TODO need to get rid of playerId requirement, take from socket.player
export function emitPlacePiece(grid, cell, playerId){
  socket.emit('placePiece', grid, cell, playerId);
}
//TODO should integrate this into Place Piece
export function emitSwitchPlayer(){
  socket.emit('switchPlayer');
}
export function sendMessage(message) {
  socket.emit('sendMessage', message);
}
