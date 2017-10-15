import React, {PureComponent} from 'react';
import Cell from './Cell.js';
import PropTypes from 'prop-types';

class Grid extends PureComponent {
  handleClick(cell){
    if(this.props.player===this.props.playerId){
      this.props.placePiece(this.props.loc, cell, this.props.player);
    }
    console.log(this.props);
    this.props.localSwitch();
  }
  render() {
    let classVal = this.props.selectable?"select ":" ";
    classVal=classVal+"cell-row";
    classVal+=this.props.winner!==0?" winner"+this.props.winner:" ";
    return <div className="grid">
        {this.props.board.map((row, r_index)=>{
          return <div className={classVal} key={r_index}>
              {row.map((elem, index)=>{
                return (<Cell selectable={this.props.selectable} handleClick={this.handleClick.bind(this, [r_index, index])}
                          loc={[r_index,index]} key={index}>{elem}</Cell>)
              })}
            </div>
        })}
      </div>
  }
}

Grid.propTypes = {
  player: PropTypes.number.isRequired,
  playerId: PropTypes.number.isRequired,
  loc: PropTypes.array.isRequired,
  board:  PropTypes.object.isRequired,
  selectable: PropTypes.bool.isRequired,
  placePiece: PropTypes.func.isRequired,
  localSwitch: PropTypes.func.isRequired,
  winner: PropTypes.number.isRequired
}

export default Grid;
