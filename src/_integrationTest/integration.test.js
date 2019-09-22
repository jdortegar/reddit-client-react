import moxios from 'moxios';
import { testStore } from '../utils';
import { fetchPosts } from '../actions/postActions';
import responseExample from '../../Front-end/top';
import responseFormattedExample from '../../Front-end/formattedTop';

describe('fetchPost action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('Store is updated correctly', () => {
    const expectedState = responseFormattedExample;

    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: responseExample,
      });
    });

    return store.dispatch(fetchPosts()).then(() => {
      const newState = store.getState();
      expect(newState.entries).toMatchObject(expectedState);
    });
  });
});
