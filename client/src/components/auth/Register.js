import { React, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { Form, Button, Card, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { PropTypes } from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Şifreler Uyumsuz!', 'danger');
    } else {
      register({ name, email, password });
    }
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
          <h1 style={{ color: 'black', marginLeft: '2rem' }}>Kaydol</h1>
        </Row>
      </Container>
      <Form className="mt-4" onSubmit={onSubmit}>
        <Form.Group controlId="Name">
          <Form.Control
            type="text"
            name="name"
            placeholder="İsim"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
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
        <Form.Group controlId="formBasicPasswordCheck">
          <Form.Control
            type="password"
            name="password2"
            placeholder="Şifreyi bi teyit edelim"
            value={password2}
            onChange={(e) => onChange(e)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Bizi anlıyor musun?" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Kaybol
        </Button>
      </Form>
    </Card>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
