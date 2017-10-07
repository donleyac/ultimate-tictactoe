import React, { Component } from 'react';
import BigGrid from './BigGrid.js';
class GameMaster extends Component {
  constructor(props){
    super(props);
    this.state = {
      player: 1
    }
  }
  nextTurn(){
    this.setState({player:this.state.player*-1})
  }
  handleWinner(){
    console.log("Winner: " + this.state.player);
  }
  render(){
    return (
      <BigGrid handleWinner={this.handleWinner} nextTurn={this.nextTurn} player={this.state.player} />
    )
  }
}

export default GameMaster;
