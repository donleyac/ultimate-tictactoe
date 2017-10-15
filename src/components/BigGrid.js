import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid.js';

class BigGrid extends PureComponent {
  render() {
    console.log("Player Id:"+this.props.playerId);
    return <div className="big-grid">
        {this.props.board.map((row,r_index)=>{
          return <div className="row" key={r_index}>
              {row.map((elem,index)=>{
                return (<Grid
                  player={this.props.player}
                  playerId={this.props.playerId}
                  placePiece={this.props.placePiece}
                  board={elem.get("board")}
                  winner={elem.get("winner")}
                  selectable={elem.get("selectable")}
                  loc={[r_index,index]}
                  localSwitch={this.props.localSwitch}
                  key={index} />)
              })}
            </div>
        })}
      </div>
  }
}
BigGrid.PropTypes = {
  board:  PropTypes.object.isRequired,
  placePiece: PropTypes.func.isRequired,
  player: PropTypes.number.isRequired,
  playerId: PropTypes.number.isRequired,
  localSwitch: PropTypes.func.isRequired
}

export default BigGrid;
