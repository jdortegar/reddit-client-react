import axios from 'axios';
import { FETCH_POSTS, DELETE_POST } from './types';
import { compose, map, path } from 'ramda';
import postsFormatter from '../utils/posts-formatter';

const formattedPosts = compose(
  map(postsFormatter),
  path(['data', 'data', 'children'])
);

// Fetch Posts

export const fetchPosts = after => dispatch => {
  let url = 'https://www.reddit.com/r/news/top.json?limit=10';
  if (after) url = `${url}&after=${after}`;

  return axios.get(url, { responseType: 'json' }).then(res => {
    if (res.status !== 200) return [];

    const payload = {
      posts: formattedPosts(res),
      after: path(['data', 'data', 'after'], res),
    };

    return dispatch({
      type: FETCH_POSTS,
      payload,
    });
  });
};
