/* eslint-disable import/no-anonymous-default-export */
import React, { Fragment } from 'react';
import rocket from '../gifs/rocket-black.gif';

export default () => (
  <Fragment>
    <img
      src={rocket}
      style={{
        width: '100px',
        margin: 'auto',
        display: 'block',
        marginTop: '8rem',
      }}
      alt="Loading..."
    />
  </Fragment>
);
