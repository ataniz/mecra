/* eslint-disable import/no-anonymous-default-export */
import React, { Fragment } from 'react';
import book from '../gifs/Rocket.gif';

export default () => (
  <Fragment>
    <img
      src={book}
      style={{
        width: '100px',
        margin: 'auto',
        display: 'block',
        marginTop: '2rem',
      }}
      alt="Loading..."
    />
  </Fragment>
);
