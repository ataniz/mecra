/* eslint-disable import/no-anonymous-default-export */
import React, { Fragment } from 'react';
import pendulum from '../gifs/pendulum-black.gif';

export default () => (
  <Fragment>
    <img
      src={pendulum}
      style={{
        width: '70px',
        margin: 'auto',
        display: 'block',
        marginTop: '8rem',
      }}
      alt="Loading..."
    />
  </Fragment>
);
