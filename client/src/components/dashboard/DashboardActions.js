import React from 'react';

import { Button } from 'react-bootstrap';

const DashboardActions = () => {
  return (
    <Button.Group>
      <Button href="/edit-profile">Profil Güncelle</Button>
      <Button href="/create-post">Makale Yaz</Button>
      <Button>Kendini Bil</Button>
    </Button.Group>
  );
};

export default DashboardActions;
