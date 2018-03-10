import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from './../redux/action_creators.js';

export default class Chat extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(ev) {
    this.setState({ input: ev.target.value })
  }
  handleSubmit(ev) {
    ev.preventDefault()
    this.props.sendMessage(this.state.input);
    this.setState({ input: '' })
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.messages.map(elem=>(<li>{elem[0]+": " + elem[1]}</li>))}
        </ul>
        <input type="text" onChange={this.handleChange} value={this.state.input}/>
        <input type="button" value="Send" onClick={this.handleSubmit}/>
      </div>
    );
  }
}
