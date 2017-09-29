import { Component } from 'react';

class AbstractGrid extends Component {
  constructor(props){
    super(props);
    this.players = [1, -1];
    this.state = {
      board: [...Array(3).keys()].map(i => Array(3).fill(0)),
      winner: null
    }
  }
  handleClick(pos, player){
    let board = this.state.board;
    board[pos[0],pos[1]] = player;
    this.setState({board: board})
  }
  checkWinner(){
    let board = this.state.board;
    //Horizontal Check
    board.forEach(row=>{
      if(Math.abs(row[0]+row[1]+row[2])===3){
        this.setState({winner:row[0]});
      }
    });
    //Vertical Check
    board.forEach((row,index)=>{
      if(Math.abs(board[0][index]+board[1][index]+board[2][index])===3){
        this.setState({winner:board[0][index]});
      }
    });
    //Diagonal Check
    if(Math.abs(board[0][0]+board[1][1]+board[2][2])===3){
      this.setState({winner:board[0][0]});
    }
    if(Math.abs(board[0][2]+board[1][1]+board[2][0])===3){
      this.setState({winner:board[0][2]});
    }
  }
}

export default AbstractGrid;
