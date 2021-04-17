import { React, useState } from 'react';
import { Form, Button, Card, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
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
      console.log('Şifreler Uyumsuz!');
    } else {
      console.log(formData);
    }
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

export default Register;
