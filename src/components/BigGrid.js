import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid.js';

class BigGrid extends PureComponent {
  render() {
    return this.props.board.size>0?(<div className="big-grid">
          {[...Array(3)].map((r_u, r) => {
            return <div className="row" key={r}>
              {[...Array(3)].map((e_u, i) => {
                let index = r*3+i;
                let elem = this.props.board.get(index);
                return <Grid
                    activePlayer={this.props.activePlayer}
                    playerId={this.props.playerId}
                    placePiece={this.props.placePiece}
                    board={elem.get("grid")}
                    winner={elem.get("winner")}
                    selectable={elem.get("selectable")}
                    loc={index}
                    switchPlayer={this.props.switchPlayer}
                    key={index} />
              })}
            </div>
          })}
        </div>):
        <p>Loading</p>
  }
}
BigGrid.PropTypes = {
  board:  PropTypes.object.isRequired,
  placePiece: PropTypes.func.isRequired,
  activePlayer: PropTypes.number.isRequired,
  playerId: PropTypes.number.isRequired,
  switchPlayer: PropTypes.func.isRequired
}

export default BigGrid;
