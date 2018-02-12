import {socket} from './index.js';
import {store} from './index.js';
import {setState, setUsername, setRoom, messageReceived} from './redux/action_creators.js';


export default function () {
  socket.on('state', state =>
    store.dispatch(setState(state))
  );
  //Clientside disconnect
  socket.on('disconnectThatSoc', ()=> {
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

  socket.on('action', action=> store.dispatch(action));
}
export function sendMessage(message) {
  socket.emit('sendMessage', message);
}
export function emitTruncateAll(){
  socket.emit('truncateAll')
}
