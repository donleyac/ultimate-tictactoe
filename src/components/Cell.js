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
    return (
      <div onClick={this.handleClick.bind(this)} className="cell">{conversion[this.props.children]}</div>
    );
  }
}

Cell.propTypes = {
  loc: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default Cell;
