import { FETCH_POSTS } from './../actions/types';
import postReducer from './postReducer';

describe('Post Reducer', () => {
  it('Should return default state', () => {
    const newState = postReducer(undefined, {});
    expect(newState).toEqual({ after: '', posts: [], selectedPostId: '' });
  });

  it('Should return new state if receiving type', () => {
    const data = {
      posts: [{ title: 'test1' }, { title: 'test2' }, { title: 'test3' }],
      after: 'test',
      selectedPostId: '',
    };
    const newState = postReducer(undefined, {
      type: FETCH_POSTS,
      payload: data,
    });
    expect(newState).toEqual(data);
  });
});
