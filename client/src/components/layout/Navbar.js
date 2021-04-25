import { React, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import { Button } from 'react-bootstrap';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faSignOutAlt,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Fragment>
      <Nav.Link href="/dashboard" className="mr-2">
        <FontAwesomeIcon icon={faUserAlt} />
      </Nav.Link>
      <Nav.Link onClick={logout} href="#!" className="mr-2">
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        Çıkış Yap
      </Nav.Link>
    </Fragment>
  );
  // TODO: BUG! Clicks to guestlink at same loc as logout after logging out
  const guestLinks = (
    <Fragment>
      <Nav.Link href="/login" className="mr-2">
        Giriş Yap
      </Nav.Link>
      <Nav.Link href="/register" className="mr-2">
        Kaydol
      </Nav.Link>
    </Fragment>
  );

  return (
    <Navbar bg="dark" variant="dark" className="py-1">
      <Navbar.Brand href="/" style={{ color: '#ffafcc' }}>
        MECRA
      </Navbar.Brand>
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
        {!loading && isAuthenticated ? authLinks : guestLinks}
      </Nav>
    </Navbar>
  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
