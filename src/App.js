import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Layout } from 'antd';

import Posts from './components/Posts';
import PostDetail from './components/PostDetail';
import logo from './images/logo.png';

import store from './store';

import 'antd/dist/antd.css';
import './styles/main.css';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Layout>
          <Header className="header-section">
            <img src={logo} alt="SpaceX" style={{ width: 50 }} />
            <h4>Reddit Simple Client</h4>
          </Header>
          <Layout>
            <Sider width={300} theme="light" className="sidebar-section">
              <Posts />
            </Sider>
            <Content className="main-content">
              <PostDetail />
            </Content>
          </Layout>
          <Footer>©2019 David Ortega</Footer>
        </Layout>
      </div>
    </Provider>
  );
}

export default App;
