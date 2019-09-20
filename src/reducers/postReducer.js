import {
  FETCH_POSTS,
  SELECT_POST,
  DELETE_POST,
  DELETE_ALL_POSTS,
} from '../actions/types';

const initialState = {
  posts: [],
  after: '',
  selectedPostId: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      const data = action.payload;

      const newObject = {
        after: data.after,
        posts: [...state.posts, ...data.posts],
      };

      return {
        ...state,
        ...newObject,
      };
    case SELECT_POST:
      const selectedPostId = action.payload;

      const newPosts = state.posts.map(obj =>
        obj.id === selectedPostId ? { ...obj, unread: false } : obj
      );

      return {
        posts: newPosts,
        selectedPostId,
      };
    case DELETE_POST:
      const postId = action.payload;

      const filterPosts = state.posts.filter(obj => obj.id !== postId);

      return {
        posts: filterPosts,
      };
    case DELETE_ALL_POSTS:
      return {
        posts: [],
      };

    default:
      return state;
  }
}
