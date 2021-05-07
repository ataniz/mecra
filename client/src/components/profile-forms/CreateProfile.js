import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

import { Form, Row, Button, InputGroup, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare,
  faTwitterSquare,
  faYoutubeSquare,
  faInstagramSquare,
} from '@fortawesome/free-brands-svg-icons';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
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
    youtube,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <Form className="mt-4" onSubmit={(e) => onSubmit(e)}>
      <InputGroup className="mb-2">
        <InputGroup.Prepend>
          <InputGroup.Text>@</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          type="text"
          placeholder="Kullanıcı Adı"
          required
          name="username"
          value={username}
          onChange={(e) => onChange(e)}
        />
      </InputGroup>

      <InputGroup className="mb-2">
        <InputGroup.Prepend>
          <InputGroup.Text>Bio</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          as="textarea"
          placeholder="Siz kimsiniz?"
          name="bio"
          value={bio}
          onChange={(e) => onChange(e)}
        />
      </InputGroup>

      <Form.Group controlId="formGridState">
        <Form.Control
          as="select"
          name="location"
          value={location}
          onChange={(e) => onChange(e)}
        >
          <option selected>Şehrinizi Seçiniz</option>
          <option>İstanbul</option>
          <option>Kars</option>
        </Form.Control>
      </Form.Group>
      <Container className="mb-3 p-2">
        <Form.Row>
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            Sosyal Linkler
          </Button>
          <p className="my-auto ml-2">(Opsiyonal)</p>
        </Form.Row>
        {displaySocialInputs && (
          <Fragment>
            <InputGroup as={Row} className="my-2">
              <InputGroup.Prepend>
                <FontAwesomeIcon
                  icon={faTwitterSquare}
                  className="my-auto mx-2"
                  size="2x"
                />
              </InputGroup.Prepend>
              <Form.Control
                placeholder="Twitter URL"
                type="text"
                name="twitter"
                value={twitter}
                onChange={(e) => onChange(e)}
              />

              <InputGroup.Prepend>
                <FontAwesomeIcon
                  icon={faYoutubeSquare}
                  className="my-auto mx-2"
                  size="2x"
                />
              </InputGroup.Prepend>
              <Form.Control
                placeholder="Youtube URL"
                type="text"
                name="youtube"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </InputGroup>

            <InputGroup as={Row}>
              <InputGroup.Prepend>
                <FontAwesomeIcon
                  icon={faInstagramSquare}
                  className="my-auto mx-2"
                  size="2x"
                />
              </InputGroup.Prepend>
              <Form.Control
                placeholder="Instagram URL"
                type="text"
                name="instagram"
                value={instagram}
                onChange={(e) => onChange(e)}
              />

              <InputGroup.Prepend>
                <FontAwesomeIcon
                  icon={faFacebookSquare}
                  className="my-auto mx-2"
                  size="2x"
                />
              </InputGroup.Prepend>
              <Form.Control
                placeholder="Facebook URL"
                type="text"
                name="facebook"
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </InputGroup>
          </Fragment>
        )}
      </Container>

      <Button variant="primary" type="submit" className=" mr-2">
        Kaydet
      </Button>
      <Button variant="secondary" type="submit" href="/dashboard">
        Geri Dön{''}
      </Button>
    </Form>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
