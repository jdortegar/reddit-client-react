import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Icon, Avatar } from 'antd';

import avatarImage from '../images/avatar.png';

const { Meta } = Card;

class PostDetail extends Component {
  render() {
    const { post } = this.props;

    if (Object.keys(post).length === 0)
      return (
        <div className="content-section">
          <h1>Please select a Post</h1>
        </div>
      );

    return (
      <div className="content-section">
        <Card
          style={{ width: '50%' }}
          cover={<img alt="thumbnail" src={post.thumbnail} />}
          actions={[
            <div>
              <Icon type="message" key="message" /> {post.comments}
            </div>,
            <Icon
              type="eye"
              key="eye"
              style={{ color: !post.unread ? '#1890ff' : '' }}
            />,
            <Icon type="delete" key="delete" />,
          ]}
        >
          <Meta
            avatar={<Avatar src={avatarImage} />}
            title={post.author}
            description={post.title}
          />
        </Card>
      </div>
    );
  }
}

PostDetail.propTypes = {
  post: PropTypes.object,
};

PostDetail.defaultProps = {
  post: {},
};

const mapStateToProps = state => {
  const post = state.entries.posts.find(
    postEl => postEl.id === state.entries.selectedPostId
  );

  return {
    post,
  };
};

export default connect(
  mapStateToProps,
  null
)(PostDetail);
