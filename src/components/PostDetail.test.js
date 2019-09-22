import React from 'react';
import { shallow } from 'enzyme';
import PostDetail from './PostDetail';
import responseFormattedExample from '../../Front-end/formattedTop';

import { checkProps, findByTestAttr, testStore } from '../utils';

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<PostDetail store={store} />)
    .childAt(0)
    .dive();
  return wrapper;
};

describe('Post Component', () => {
  describe('Checking Proptypes', () => {
    it('Should not throw a warning', () => {
      const expectedProps = {
        deletePost: () => {},
        post: { title: 'test' },
      };

      const propsErr = checkProps(PostDetail, expectedProps);

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
      const component = findByTestAttr(wrapper, 'postDetailComponent');

      expect(component.length).toBe(1);
    });
  });
});
