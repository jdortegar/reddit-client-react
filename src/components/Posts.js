import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';

class Posts extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    const postItems = this.props.entries.posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
      </div>
    ));

    return (
      <div>
        <h1>Posts </h1>
        {postItems}
      </div>
    );
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  entries: PropTypes.shape({
    posts: PropTypes.array.isRequired,
    after: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  entries: state.entries,
});

export default connect(
  mapStateToProps,
  { fetchPosts }
)(Posts);
