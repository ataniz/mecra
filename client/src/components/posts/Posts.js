import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';

import Pendulum from '../layout/loaders/LoaderPendulum';
import PostItem from './PostItem';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading ? (
    <Pendulum />
  ) : (
    <Fragment>
      <h1> Yazılar </h1>
      <h3>Aramıza hoşgeldin!</h3>
      {posts.map(post => (<PostItem key={post._id} post={post} />))}
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
