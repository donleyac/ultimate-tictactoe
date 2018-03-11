import React from 'react';
import gql from 'graphql-tag';
import {compose, mapProps} from 'recompose';
import {graphql} from 'react-apollo';
import RoomRow from './Row';

const rooms = gql`
{
  rooms {
    id
    title
  }
}
`;

function Chatroom({rooms = []}) {
  return (
    <section>
      <h1 className="title">Rooms</h1>
      {rooms.map(room => {
        return <RoomRow key={room.id} title={room.title} id={room.id} />;
      })}
    </section>
  );
}

export default compose(
  graphql(rooms),
  mapProps(({data, ...rest}) => {
    const rooms = (data && data.rooms) || [];
    return {
      rooms,
      ...rest,
    };
  })
)(Chatroom);