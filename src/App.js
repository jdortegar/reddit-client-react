import React from 'react';
import './App.css';
import { Provider } from 'react-redux';

import Posts from './components/Posts';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Posts />
      </div>
    </Provider>
  );
}

export default App;
