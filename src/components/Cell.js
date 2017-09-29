import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cell extends Component {
  handleClick() {
    this.props.handleClick(this.props.loc);
  }
  render() {
    return (
      <div onClick={this.handleClick.bind(this)} className="cell">{this.props.children}</div>
    );
  }
}

Cell.propTypes = {
  loc: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default Cell;
