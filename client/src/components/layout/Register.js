import { React, Fragment } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
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
      <Form className="mt-4">
        <Form.Group controlId="Name">
          <Form.Control placeholder="İsminiz" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control type="email" placeholder="E-Posta Adresiniz" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Şifreniz" />
        </Form.Group>
        <Form.Group controlId="formBasicPasswordCheck">
          <Form.Control type="password" placeholder="Şifreyi bi teyit edelim" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Bizi anlıyor musunuz?" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Kaybol
        </Button>
      </Form>
    </Card>
  );
};

export default Register;
