import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid.js';

class BigGrid extends PureComponent {
  render() {
    return <div>
        {this.props.board.map((row,r_index)=>{
          return <div className="row" key={r_index}>
              {row.map((elem,index)=>{
                return (<Grid placePiece={this.placePiece}
                  loc={[r_index,index]} key={index} />)
              })}
            </div>
        })}
      </div>
  }
}
BigGrid.PropTypes = {
  board:  PropTypes.object.isRequired,
  placePiece: PropTypes.func.isRequired
}

export default BigGrid;
