import React from 'react';
import { Fragment } from 'react';

import { Button } from 'react-bootstrap';

const DashboardActions = () => {
  return (
    <Fragment>
      <Button href="/edit-profile">Profil Güncelle</Button>
      <Button href="/create-post">Makale Yaz</Button>
      <Button>Kendini Bil</Button>
    </Fragment>
  );
};

export default DashboardActions;
