import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare,
  faTwitterSquare,
  faYoutubeSquare,
  faInstagramSquare,
} from '@fortawesome/free-brands-svg-icons';

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
      <Button onClick={() => toggleSocialInputs(!displaySocialInputs)}>
        Sosyal Linkler
      </Button>

      {displaySocialInputs && (
        <Fragment>
          <InputGroup as={Row} className="mt-2 p-2">
            <InputGroup.Prepend>
              <FontAwesomeIcon
                icon={faTwitterSquare}
                className="my-auto mx-2"
                size="2x"
              />
            </InputGroup.Prepend>
            <Form.Control placeholder="Twitter URL" type="text" />

            <InputGroup.Prepend>
              <FontAwesomeIcon
                icon={faYoutubeSquare}
                className="my-auto mx-2"
                size="2x"
              />
            </InputGroup.Prepend>
            <Form.Control placeholder="Youtube URL" type="text" />
          </InputGroup>

          <InputGroup as={Row} className="p-2">
            <InputGroup.Prepend>
              <FontAwesomeIcon
                icon={faInstagramSquare}
                className="my-auto mx-2"
                size="2x"
              />
            </InputGroup.Prepend>
            <Form.Control placeholder="Instagram URL" type="text" />

            <InputGroup.Prepend>
              <FontAwesomeIcon
                icon={faFacebookSquare}
                className="my-auto mx-2"
                size="2x"
              />
            </InputGroup.Prepend>
            <Form.Control placeholder="Facebook URL" type="text" />
          </InputGroup>
        </Fragment>
      )}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

CreateProfile.propTypes = {};

export default CreateProfile;
