import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POST,
  GET_POSTS,
  UPDATE_POST,
  DELETE_POST,
  CREATE_POST,
  POST_ERROR,
  UPDATE_VOTES,
} from './types';

// Get a post by id
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get a posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts`);

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Upvote
export const upvote = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/upvote/${id}`);

    dispatch({
      type: UPDATE_VOTES,
      payload: { id, votes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Downvote
export const downvote = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/downvote/${id}`);

    dispatch({
      type: UPDATE_VOTES,
      payload: { id, votes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update post
export const createPost =
  (rawState, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post('/api/posts', rawState, config);

      if (!edit) {
        dispatch({
          type: CREATE_POST,
          payload: res.data,
        });
      } else {
        dispatch({
          type: UPDATE_POST,
          payload: res.data,
        });
      }

      dispatch(
        setAlert(edit ? 'Post Kaydedildi' : 'Post Oluşturuldu', 'success')
      );
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Delete Post
export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert('Postunuz silindi', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
