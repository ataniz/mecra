import React, { useState } from 'react';
import { DraftailEditor } from 'draftail';
import { EditorState, convertToRaw } from 'draft-js';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../../actions/post';

import './CreatePost.css';
import 'draft-js/dist/Draft.css';
import 'draftail/dist/draftail.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-side-toolbar-plugin/lib/plugin.css';

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;
const plugins = [inlineToolbarPlugin, sideToolbarPlugin];

const CreatePost = ({ createPost }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const rawContent = JSON.stringify(convertToRaw(contentState));
    createPost(rawContent);
  };

  return (
    <Form className="PostEditor" onSubmit={(e) => onSubmit(e)}>
      <Button variant="primary" type="submit" className=" mr-2">
        Kaydet
      </Button>
      <DraftailEditor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Sevgi kelebekleri..."
        plugins={plugins}
      />
      <InlineToolbar />
      <SideToolbar />
    </Form>
  );
};

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
};

export default connect(null, { createPost })(withRouter(CreatePost));
