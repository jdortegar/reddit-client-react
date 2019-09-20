import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchPosts,
  selectPost,
  deletePost,
  deleteAllPost,
} from '../actions/postActions';
import Moment from 'react-moment';
import InfiniteScroll from 'react-infinite-scroller';

import { List, Avatar, Icon } from 'antd';
import avatarImage from '../images/avatar.png';

const IconText = ({ type, text, active }) => (
  <span>
    <Icon
      type={type}
      style={{ marginRight: 8, color: active ? '#1890ff' : '' }}
    />
    {text}
  </span>
);

class Posts extends Component {
  state = {};
  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    const listData = this.props.entries.posts;

    return (
      <div>
        <div className="demo-infinite-container">
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <List
              itemLayout="vertical"
              size="large"
              dataSource={listData}
              className="sidebar-section"
              renderItem={item => (
                <List.Item
                  key={item.id}
                  actions={[
                    <IconText
                      type="message"
                      text={item.comments}
                      key="list-vertical-message"
                    />,
                    <IconText
                      type="eye"
                      active={!item.unread}
                      key="list-vertical-eye"
                    />,
                    <div onClick={() => this.props.deletePost(item.id)}>
                      <IconText type="delete" key="list-vertical-delete" />
                    </div>,
                  ]}
                  extra={
                    item.thumbnail !== 'self' && (
                      <img width={50} alt="thumbnail" src={item.thumbnail} />
                    )
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={avatarImage} />}
                    title={item.author}
                    description={<Moment fromNow>{item.createdDate}</Moment>}
                  />
                  <div
                    className="list-link-style"
                    onClick={() => this.props.selectPost(item.id)}
                  >
                    {item.title}
                  </div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
        {listData.length > 0 && (
          <div
            className="dismiss-button list-link-style"
            onClick={() => this.props.deleteAllPost()}
          >
            Dismiss All
          </div>
        )}
      </div>
    );
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  selectPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  deleteAllPost: PropTypes.func.isRequired,
  entries: PropTypes.shape({
    posts: PropTypes.array.isRequired,
    after: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  entries: state.entries,
});

const mapDispatchToProps = {
  fetchPosts,
  selectPost,
  deletePost,
  deleteAllPost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
