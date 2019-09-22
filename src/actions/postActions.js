import axios from 'axios';
import {
  FETCH_POSTS,
  SELECT_POST,
  DELETE_POST,
  DELETE_ALL_POSTS,
} from './types';
import { compose, map, path } from 'ramda';
import postsFormatter from '../utils/posts-formatter';

const formattedPosts = compose(
  map(postsFormatter),
  path(['data', 'data', 'children'])
);

// Fetch Posts

export const fetchPosts = after => dispatch => {
  let url =
    'http://www.reddit.com/r/pics/search.json?q=kittens&sort=new.json?limit=10';
  if (after) url = `${url}&after=${after}`;

  return axios
    .get(url, { responseType: 'json' })
    .then(res => {
      const payload = {
        posts: formattedPosts(res),
        after: path(['data', 'data', 'after'], res),
      };

      return dispatch({
        type: FETCH_POSTS,
        payload,
      });
    })
    .catch(err => console.log(err));
};

// Select Post

export const selectPost = postId => dispatch => {
  const payload = postId;

  return dispatch({
    type: SELECT_POST,
    payload,
  });
};

// Delete Post

export const deletePost = postId => dispatch => {
  const payload = postId;

  return dispatch({
    type: DELETE_POST,
    payload,
  });
};

// Delete all Posts

export const deleteAllPost = () => dispatch =>
  dispatch({
    type: DELETE_ALL_POSTS,
  });
