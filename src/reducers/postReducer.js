import { FETCH_POSTS, SELECT_POST, DELETE_POST } from '../actions/types';

const initialState = {
  posts: [],
  after: '',
  selectedPostId: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      const data = action.payload;
      return {
        ...state,
        ...data,
      };
    case SELECT_POST:
      return {
        ...state,
        selectedPostId: action.payload,
      };

    default:
      return state;
  }
}
