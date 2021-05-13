import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Form, Button, Card, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Card className="mt-4 border-0">
      <Container
        className="mt-4 border-0 clearfix"
        style={{ display: 'inline' }}
      >
        <Row>
          <FontAwesomeIcon icon={faUserAstronaut} size="4x" />
          <h1 style={{ color: 'black', marginLeft: '2rem' }}>
            Mecra'ya Giriş Yap
          </h1>
        </Row>
      </Container>
      <Form className="mt-4" onSubmit={(e) => onSubmit(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="email"
            name="email"
            placeholder="E-Posta Adresi"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            name="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </Form.Group>
        <Form.Row className="m-auto">
          <Button variant="primary" type="submit">
            Giriş Yap
          </Button>
          <p className="ml-2 my-auto">
            <Link to="/register">Mecra'ya Kaydol</Link>
          </p>
        </Form.Row>
      </Form>
    </Card>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
