import { convertFromRaw, EditorState } from 'draft-js';

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { Card } from 'react-bootstrap';

const PostItem = ({
  auth,
  post: { _id, state, avatar, user, upvotes, downvotes, comments, date },
}) => {
  const contentState = convertFromRaw(JSON.parse(state));
  EditorState.createWithContent(contentState);
  const text = EditorState.getPlainText();

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Buraya Title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>{text}</Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, {})(PostItem);
