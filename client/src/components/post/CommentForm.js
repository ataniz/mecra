import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import { InputGroup, Form, Button } from 'react-bootstrap';
//gizli dursun basinca acilsin SADECE AUTH OLANLARA!!
const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <Form
      className="mt-4"
      onSubmit={(e) => {
        e.preventDefault();
        addComment(postId, { text });
        setText('');
      }}
    >
      <InputGroup className="mb-2">
        <InputGroup.Prepend>
          <InputGroup.Text>Bio</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          as="textarea"
          placeholder="Yorumunuz?"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </InputGroup>
      <Button variant="primary" type="submit" className=" mr-2">
        Kaydet
      </Button>
    </Form>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
