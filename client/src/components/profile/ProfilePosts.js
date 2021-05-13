import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Image } from 'react-bootstrap';
import PostCard from '../posts/PostItem';

const ProfilePosts = ({ profile: { forums, posts } }) => {
  return (
    <Col>
      {posts.length > 0 ? (
        posts.map((post, index) => <PostCard key={index} post={post} />)
      ) : (
        <h4>hic postu yok</h4>
      )}
    </Col>
  );
};

ProfilePosts.propTypes = { profile: PropTypes.object.isRequired };

export default ProfilePosts;
