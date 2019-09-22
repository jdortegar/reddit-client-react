import React from 'react';
import { shallow } from 'enzyme';
import Post from './Posts';
import responseFormattedExample from '../../Front-end/formattedTop';

import { checkProps, findByTestAttr, testStore } from '../utils';

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<Post store={store} />)
    .childAt(0)
    .dive();
  return wrapper;
};

describe('Post Component', () => {
  describe('Checking Proptypes', () => {
    it('Should not throw a warning', () => {
      const expectedProps = {
        fetchPosts: () => {},
        selectPost: () => {},
        deletePost: () => {},
        deleteAllPost: () => {},
        entries: {
          posts: [1, 2, 3],
          after: 'test',
        },
      };

      const propsErr = checkProps(Post, expectedProps);

      expect(propsErr).toBeUndefined();
    });
  });

  describe('Renders', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = responseFormattedExample.entries;
      wrapper = setUp(initialState);
    });

    it('Should Render a Post', () => {
      const component = findByTestAttr(wrapper, 'postsComponent');

      expect(component.length).toBe(1);
    });

    it('handleInfiniteOnLoad Method should update state as expected', () => {
      const classInstance = wrapper.instance();
      classInstance.handleInfiniteOnLoad();
      const newState = classInstance.state.loading;
      expect(newState).toBe(true);
    });
  });
});
