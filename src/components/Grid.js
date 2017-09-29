import React  from 'react';
import AbstractGrid from './AbstractGrid.js';
import Cell from './Cell.js';
import PropTypes from 'prop-types';

class Grid extends AbstractGrid {
  constructor(props){
    super(props);
    this.filling = this.props.fill?this.props.fill: "-";
  }
  handleClick(cell) {
    console.log(this.props.loc);
    console.log(cell);
  }
  render() {
    return <div className="grid">
        {this.state.board.map((row, r_index)=>{
          return <div className="cell-row" key={r_index}>
              {row.map((elem, index)=>{
                return (<Cell handleClick={this.handleClick.bind(this)}
                          loc={[r_index,index]} key={index}>{this.filling}</Cell>)
              })}
            </div>
        })}
      </div>
  }
}

Grid.propTypes = {
  loc: PropTypes.array,
  fill: PropTypes.string
}

export default Grid;
