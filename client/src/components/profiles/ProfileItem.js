import React from 'react';
import PropTypes from 'prop-types';
import { Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//TODO make it pretty
const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    bio,
    location,
  },
}) => {
  return (
    <Container>
      <Row>
        <Image src={avatar} className="width-30px" roundedCircle />
        <Container>
          <h2>{name}</h2>
          <p>{bio}</p>
          <p>{location}</p>
          <Link to={`/profile/${_id}`}>Bana bak!</Link>
        </Container>
      </Row>
    </Container>
  );
};

ProfileItem.propTypes = { profile: PropTypes.object.isRequired };

export default ProfileItem;
