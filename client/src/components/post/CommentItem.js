import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import { Button } from 'react-bootstrap';
//update comment

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
}) => {
  return (
    <div>
      <Link to={`/profile/${user}`}>
        <img src={avatar} />
        <h4>{name}</h4>
      </Link>
      <p>{text}</p>
      <p>
        Tarih: <Moment format="DD/MM/YYYY">{date}</Moment>
      </p>
      {!auth.loading && user === auth.user._id && (
        <Button onClick={(e) => deleteComment(postId, _id)} variant="danger">
          X
        </Button>
      )}
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
