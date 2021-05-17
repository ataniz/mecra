/* eslint-disable import/no-anonymous-default-export */
import {
  GET_POST,
  GET_POSTS,
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
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
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
    case UPDATE_VOTES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, votes: payload.votes } : post
        ),
      };

    default:
      return state;
  }
}
