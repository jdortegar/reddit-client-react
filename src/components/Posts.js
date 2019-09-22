import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import QueueAnim from 'rc-queue-anim';
import InfiniteScroll from 'react-infinite-scroller';
import { List, Avatar, Icon, Spin, Button } from 'antd';

import {
  fetchPosts,
  selectPost,
  deletePost,
  deleteAllPost,
} from '../actions/postActions';

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
  state = {
    data: [],
    loading: false,
    dismissAll: false,
  };

  componentDidMount() {
    this.props.fetchPosts();
  }

  handleInfiniteOnLoad = () => {
    let { after } = this.props.entries;
    if (this.state.dismissAll) return;
    this.setState({ loading: true });

    this.props.fetchPosts(after).then(
      setTimeout(() => {
        this.setState({ loading: false });
      }, 2000)
    );
  };

  render() {
    const listData = this.props.entries.posts;

    return (
      <div>
        <div className="demo-infinite-container" data-test="postsComponent">
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading}
            useWindow={false}
          >
            <div className="ant-list sidebar-section ant-list-vertical ant-list-lg ant-list-split">
              <QueueAnim
                type={['right', 'left']}
                leaveReverse
                component="ul"
                className="ant-list-items"
              >
                {listData.map(item => (
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
                      item.thumbnail.indexOf('thumbs') > 1 && (
                        <img width={50} alt="thumbnail" src={item.thumbnail} />
                      )
                    }
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={avatarImage} />}
                      title={item.author}
                      description={
                        <Moment fromNow unix>
                          {item.createdDate}
                        </Moment>
                      }
                    />
                    <div
                      className="list-link-style"
                      onClick={() => this.props.selectPost(item.id)}
                    >
                      {item.title}
                    </div>
                  </List.Item>
                ))}
              </QueueAnim>
            </div>

            {this.state.loading && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
            {listData.length === 0 && this.state.dismissAll && (
              <div className="fetch-button">
                <Button
                  type="primary"
                  onClick={() => {
                    this.setState({ dismissAll: false });
                    this.props.fetchPosts();
                  }}
                >
                  Fetch Posts
                </Button>
              </div>
            )}
          </InfiniteScroll>
        </div>
        {listData.length > 0 && (
          <div
            className="dismiss-button list-link-style"
            onClick={() => {
              this.setState({ dismissAll: true });
              this.props.deleteAllPost();
            }}
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
