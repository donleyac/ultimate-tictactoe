import React from 'react';
import gql from 'graphql-tag';
import {compose, withHandlers} from 'recompose';
import {graphql} from 'react-apollo';

function SendMessageButton({sendMessage}) {
  return (
    <button className="button-item" onClick={sendMessage}>Send Message</button>
  );
};

const addMessage = gql`
  mutation add($text: String!, $userId: Int!, $roomId: Int!) {
    addMessage(text: $text, userId: $userId, roomId: $roomId) {
      text
    }
  }
`;

export default compose(
  graphql(addMessage),
  withHandlers({
    sendMessage: ({setMessage, id, message, mutate}) => {
      return e => {
        mutate({
          variables: {
            text: message,
            userId: 1,
            roomId: id,
          },
        })
          .then(data => {
            return setMessage('');
          })
          .catch(e => {
            console.error(e);
          });
      };
    },
  })
)(SendMessageButton);