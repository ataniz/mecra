import React from 'react';
import PropTypes from 'prop-types';
//Element for about page (ne koysak buraya?)
const ProfileAbout = ({ profile: { bio } }) => {
  return <div></div>;
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
