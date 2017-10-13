import React from 'react';
import AbstractGrid from './AbstractGrid.js';
import Grid from './Grid.js';

class BigGrid extends AbstractGrid {
  handleClick(grid){
    super.handleClick();
    super.checkWinner();
  }
  handleNextTurn(){
    if(this.state.winner) {
      this.props.handleWinner();
    }
    else {
      this.props.nextTurn();
    }
  }
  render() {
    return <div>
        {this.state.board.map((row,r_index)=>{
          return <div className="row" key={r_index}>
              {row.map((elem,index)=>{
                return (<Grid nextTurn={this.handleNextTurn}
                  player={this.props.player}
                  setGridState={super.handleClick}
                  loc={[r_index,index]} key={index} />)
              })}
            </div>
        })}
      </div>
  }
}

export default BigGrid;
