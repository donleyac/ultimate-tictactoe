import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function _callback({ data: { user } }) {
    return (
      <ul>
        {user.map(({ id}) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
    );
  }
  

export default graphql(gql`
    mutation {
        truncateAll {
        id
        }
    }
`)(_callback);

