import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'
// import Home from './pages/Home.js';
// import Local from './pages/Local.js';
// import Multiplayer from './pages/Multiplayer.js';
import Chatroom from './components';

export default(
    <Router>
        <div>
            <Route exact path='/' component={Chatroom}/>
            {/* <Route exact path='/' component={Home}/>
            <Route exact path='/local' component={Local}/>
            <Route exact path='/multi' component={Multiplayer}/> */}
        </div>
    </Router>
);
