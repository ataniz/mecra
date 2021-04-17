import { React } from 'react';
import { Button } from 'react-bootstrap';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" className="py-1">
      <Navbar.Brand href="/">MECRA</Navbar.Brand>
      <Form inline className="ml-2">
        <FormControl
          type="text"
          placeholder="kime bakmıştın?"
          className="mr-sm-2"
          style={{ fontSize: 12 }}
        />
        <Button variant="outline-info" style={{ fontSize: 12 }}>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </Form>
      <Nav className="ml-auto">
        <Nav.Link href="/login" className="mr-2">
          Giriş Yap
        </Nav.Link>
        <Nav.Link href="/register" className="mr-2">
          Kaydol
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
