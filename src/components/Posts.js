import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import Moment from 'react-moment';

import { List, Avatar, Icon } from 'antd';
import avatarImage from '../images/avatar.png';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class Posts extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    const listData = this.props.entries.posts;

    return (
      <List
        itemLayout="vertical"
        size="large"
        dataSource={listData}
        footer={
          listData.length > 0 && (
            <div classname="dismiss-button">Dismiss All</div>
          )
        }
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
              <IconText type="eye" key="list-vertical-eye" />,
              <IconText type="delete" key="list-vertical-delete" />,
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
              description={<Moment>{item.createdDate}</Moment>}
            />
            {item.title}
          </List.Item>
        )}
      />
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
