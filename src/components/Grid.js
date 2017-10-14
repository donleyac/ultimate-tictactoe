import React, {PureComponent} from 'react';
import Cell from './Cell.js';
import PropTypes from 'prop-types';

class Grid extends PureComponent {
  constructor(props){
    super(props);
    this.filling = this.props.fill?this.props.fill: "-";
  }
  handleClick(cell) {
    super.handleClick(cell);
    super.checkWinner();
    this.state.winner?this.props.setGridState(this.props.loc):null;
  }
  render() {
    return <div className="grid">
        {this.state.board.map((row, r_index)=>{
          return <div className="cell-row" key={r_index}>
              {row.map((elem, index)=>{
                return (<Cell handleClick={this.handleClick.bind(this)}
                          loc={[r_index,index]} key={index}>{elem}</Cell>)
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
