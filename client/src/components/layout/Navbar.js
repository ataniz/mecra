import { React } from 'react';
import { Button } from 'react-bootstrap';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" className="py-1">
      <Navbar.Brand href="#home">MECRA</Navbar.Brand>
      <Form inline className="ml-2">
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          style={{ fontSize: 12 }}
        />
        <Button variant="outline-info" style={{ fontSize: 12 }}>
          Search
        </Button>
      </Form>
      <Nav className="ml-auto">
        <Nav.Link href="#login" className="mr-2">
          Login
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
