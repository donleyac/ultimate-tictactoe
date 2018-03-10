import React, {PureComponent} from 'react';
import Cell from './Cell.js';
import PropTypes from 'prop-types';

export default class Grid extends PureComponent {
  handleClick(cell){
    if(this.props.activePlayer===this.props.playerId){
      this.props.placePiece(this.props.loc, cell, this.props.activePlayer);
      this.props.switchPlayer();
    }
  }
  render() {
    let classVal = this.props.selectable?"select ":" ";
    classVal=classVal+"cell-row";
    classVal+=this.props.winner!==0?" winner"+this.props.winner:" ";

    return <div className="grid">
      {[...Array(3)].map((r_u, r) => {
        return <div className={classVal} key={r}>
          {[...Array(3)].map((e_u, i) => {
            let index = r*3+i;
            let elem = this.props.board.get(index);
            return <Cell selectable={this.props.selectable}
                      handleClick={this.handleClick.bind(this,index)}
                      loc={index} key={index}>{elem}</Cell>
          })}
        </div>
      })}
    </div>
  }
}

Grid.propTypes = {
  activePlayer: PropTypes.number.isRequired,
  playerId: PropTypes.number.isRequired,
  loc: PropTypes.number.isRequired,
  board:  PropTypes.object.isRequired,
  selectable: PropTypes.bool.isRequired,
  placePiece: PropTypes.func.isRequired,
  switchPlayer: PropTypes.func.isRequired,
  winner: PropTypes.number.isRequired
}
