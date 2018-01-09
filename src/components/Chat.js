import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from './../action_creators.js';

export class Chat extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: props.messages
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this._handleMessageEvent = this._handleMessageEvent.bind(this);
  }
  componentDidMount() {
    this._handleMessageEvent()
  }
  _handleMessageEvent(){
  socket.on('chat message', (inboundMessage) => {
    this.props.newMessage({user: 'test_user', message: inboundMessage})
     })
  }
  handleOnChange(ev) {
    this.setState({ input: ev.target.value })
  }
  handleOnSubmit(ev) {
    ev.preventDefault()
    socket.emit('chat message', { message: this.state.input })
    this.setState({ input: '' })
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}
Chat.PropTypes = {

}
export default connect(null, actionCreators)(Game);
