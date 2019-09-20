import { FETCH_POSTS, DELETE_POST } from '../actions/types';

const initialState = {
  posts: [],
  after: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      const data = action.payload;
      return {
        ...state,
        ...data,
      };

    default:
      return state;
  }
}
