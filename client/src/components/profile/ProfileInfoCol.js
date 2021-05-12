import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear, faSadCry } from '@fortawesome/free-regular-svg-icons';

//TODO: followingleri populerlige gore sirala ve hepsini gorme butonu ekle
const ProfileInfoCol = ({
  profile: {
    username,
    location,
    bio,
    following,
    followers,
    forums,
    posts,
    user: { name, avatar },
  },
}) => {
  return (
    <Col>
      <Row>
        <Image src={avatar} rounded />
      </Row>
      <Row>
        <h3>{username}</h3>
      </Row>
      <Row>
        <p>{bio}</p>
      </Row>
      <Row>
        Takip Ettikleri:
        {following.length > 0 ? (
          <ul>
            {following.slice(0, 4).map((user, index) => (
              <li key={index} className="text-primary">
                {user}
              </li>
            ))}
          </ul>
        ) : (
          <Fragment>
            <FontAwesomeIcon icon={faSadTear} className="my-auto" />
            <p>Kimseyi Takip Etmiyor</p>
          </Fragment>
        )}
      </Row>
      <Row>
        Takipçileri:
        {followers.length > 0 ? (
          <ul>
            {following.slice(0, 4).map((user, index) => (
              <li key={index} className="text-primary">
                {user}
              </li>
            ))}
          </ul>
        ) : (
          <Fragment>
            <FontAwesomeIcon icon={faSadCry} className="my-auto" />
            <p>Kimse onu Takip Etmiyor</p>
          </Fragment>
        )}
      </Row>
    </Col>
  );
};

ProfileInfoCol.propTypes = { profile: PropTypes.object.isRequired };

export default ProfileInfoCol;
