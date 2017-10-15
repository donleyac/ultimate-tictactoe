import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cell extends Component {
  handleClick() {
    this.props.handleClick(this.props.loc);
  }
  render() {
    let conversion = {
      0: '_',
      1: 'X',
      "-1": 'O'
    }
    let cell = this.props.selectable?
          (<div
            onClick={this.handleClick.bind(this)}
            className="cell">{conversion[this.props.children]}
          </div>):
          (<div
            className="cell">{conversion[this.props.children]}
          </div>);
    return (
      cell
    );
  }
}

Cell.propTypes = {
  loc: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectable: PropTypes.bool.isRequired
}

export default Cell;
