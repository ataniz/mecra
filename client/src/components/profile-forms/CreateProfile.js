import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

const CreateProfile = (props) => {
  const [fromData, setFormData] = useState({
    username: '',
    status: '',
    location: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    username,
    location,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = fromData;

  return (
    <Form className="mt-4">
      <Form.Label>Kullanıcı Adı</Form.Label>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>@</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control type="text" required />
      </InputGroup>

      <Form.Group className="mt-2">
        <Form.Label>Bio</Form.Label>
        <Form.Control placeholder="Siz kimsiniz?" type="text" />
      </Form.Group>

      <Form.Group controlId="formGridState">
        <Form.Label>Konum</Form.Label>
        <Form.Control as="select" placeholder="Şehriniz">
          <option>İstanbul</option>
          <option>Kars</option>
        </Form.Control>
      </Form.Group>
      <Button small>Sosyal Linkler</Button>

      <Form.Row className="mt-3">
        <InputGroup as={Col} className="mt-2">
          <InputGroup.Prepend>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faUserAstronaut} />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control placeholder="Twitter URL" type="text" />
        </InputGroup>

        <Form.Group as={Col} className="mt-2">
          <Form.Control placeholder="Youtube URL" type="text" />
        </Form.Group>
      </Form.Row>
      <Form.Row className=" p-2">
        <Form.Group as={Col} className="mt-2">
          <Form.Control placeholder="Instagram URL" type="text" />
        </Form.Group>
        <Form.Group as={Col} className="mt-2">
          <Form.Control placeholder="Facebook URL" type="text" />
        </Form.Group>
      </Form.Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

CreateProfile.propTypes = {};

export default CreateProfile;
