/* eslint-disable import/no-anonymous-default-export */
import {
  GET_POST,
  UPDATE_POST,
  POST_ERROR,
  CLEAR_POST,
} from '../actions/types';

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POST:
    case UPDATE_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_POST:
      return {
        ...state,
        post: null,
        loading: false,
      };

    default:
      return state;
  }
}
