/* eslint-disable import/no-anonymous-default-export */
import React, { Fragment } from 'react';
import book from '../gifs/Book.gif';

export default () => (
  <Fragment>
    <img
      src={book}
      style={{ width: '100px', margin: 'auto', display: 'block' }}
      alt="Loading..."
    />
  </Fragment>
);
