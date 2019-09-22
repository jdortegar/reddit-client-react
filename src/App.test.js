import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import { findByTestAttr, testStore } from './utils';

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<App store={store} />);
  return wrapper;
};

describe('App Component', () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {
      entries: {
        posts: [{ title: 'test1' }, { title: 'test2' }, { title: 'test3' }],
        after: 'test',
        selectedPostId: '',
      },
    };
    wrapper = setUp(initialState);
  });

  it('Should render without errors', () => {
    const component = findByTestAttr(wrapper, 'appComponent');
    expect(component.length).toBe(1);
  });
});
