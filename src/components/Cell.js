import React, { Component } from 'react';
import {ui_mapping} from './../const.js';
import PropTypes from 'prop-types';

class Cell extends Component {
  handleClick() {
    this.props.handleClick(this.props.loc);
  }
  render() {
    let classVal = this.props.classVal + " cell";
    let cell = this.props.selectable?
          (<div
            onClick={this.handleClick.bind(this)}
            className={classVal}>{ui_mapping[this.props.children]}
          </div>):
          (<div
            className={classVal}>{ui_mapping[this.props.children]}
          </div>);
    return (
      cell
    );
  }
}

Cell.propTypes = {
  loc: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectable: PropTypes.bool.isRequired
}

export default Cell;
