import { convertFromRaw, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { upvote, downvote } from '../../actions/post';

import { Card, Container, Col, Row, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
} from '@fortawesome/free-solid-svg-icons';

const PostItem = ({
  auth,
  post: {
    _id,
    state,
    avatar,
    user,
    votes: { upvotes, downvotes },
    comments,
    date,
  },
  upvote,
  downvote,
}) => {
  const editorContentHtml = '';
  const voteSum = upvotes.length - downvotes.length;
  // if (state) {
  //   const contentState = convertFromRaw(JSON.parse(state));
  //   editorContentHtml = stateToHTML(
  //     EditorState.createWithContent(contentState)
  //   );
  // }

  //badge ekle
  return (
    <Container>
      <Row>
        <Col md={2}>
          <Row>
            <Button
              variant="outline-info"
              onClick={(e) => upvote(_id)}
              style={{ fontSize: 12 }}
            >
              <FontAwesomeIcon icon={faArrowAltCircleUp} />
            </Button>
          </Row>
          {voteSum > 0 && <Row className="m-auto">{voteSum}</Row>}
          <Row>
            <Button
              variant="outline-info"
              onClick={(e) => downvote(_id)}
              style={{ fontSize: 12 }}
            >
              <FontAwesomeIcon icon={faArrowAltCircleDown} />
            </Button>
          </Row>
        </Col>
        <Col md={10}>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Buraya Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <Moment format="DD/MM/YYYY">{date}</Moment>
              </Card.Subtitle>
              <Card.Text>Buraya yazi</Card.Text>
              {editorContentHtml}
              {!auth.loading && auth.user && user === auth.user._id && (
                <Button variant="outline-danger" style={{ fontSize: 12 }}>
                  Postu Sil
                </Button>
              )}
              <Button
                variant="outline-info"
                style={{ fontSize: 12 }}
                href={`/post/${_id}`}
              >
                Yorumlar{' '}
                {comments.length > 0 && (
                  <Badge variant="secondary">{comments.length}</Badge>
                )}
              </Button>
              <Card.Link href={`/post/${_id}`}>Post'a Git</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { upvote, downvote })(PostItem);
