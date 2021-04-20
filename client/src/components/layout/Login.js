import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
  };

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
        <Button variant="primary" type="submit">
          Giriş Yap
        </Button>
        <p className="mt-2">
          <Link to="/register">Mecra'ya Kaydol</Link>
        </p>
      </Form>
    </Card>
  );
};

export default Login;
