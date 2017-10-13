import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'
import Home from './pages/Home.js';
import GameContainer from './pages/Game.js';
export default(
    <Router>
        <div>
            <Route exact path='/' component={Home}/>
            <Route path='/game' component={GameContainer}/>
        </div>
    </Router>
);
