import React from 'react';
import {Link} from 'react-router-dom';
export default function(props){
  return (
    <div id="home">
      <h1>Welcome to Ultimate TicTacToe</h1>
      <div className="row-items">
        <Link to="/game">Play Game</Link>
      </div>
    </div>
  )
}
