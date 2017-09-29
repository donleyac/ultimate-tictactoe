import React from 'react';
import AbstractGrid from './AbstractGrid.js';
import Grid from './Grid.js';

class BigGrid extends AbstractGrid {
  render() {
    return <div>
        {this.state.board.map((row,r_index)=>{
          return <div className="row" key={r_index}>
              {row.map((elem,index)=>{
                return (<Grid loc={[r_index,index]} key={index} />)
              })}
            </div>
        })}
      </div>
  }
}

export default BigGrid;
