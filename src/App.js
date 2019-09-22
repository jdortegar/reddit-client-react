import React from 'react';
import './App.css';

import { Layout } from 'antd';

import Posts from './components/Posts';
import PostDetail from './components/PostDetail';
import logo from './images/logo.png';

import 'antd/dist/antd.css';
import './styles/main.css';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App" data-test="appComponent">
      <Layout>
        <Header
          className="header-section"
          style={{ position: 'fixed', zIndex: 1, width: '100%' }}
        >
          <img src={logo} alt="Reddit" style={{ width: 50 }} />
          <h4>Reddit Simple Client</h4>
        </Header>
        <Layout>
          <Sider
            width="50%"
            theme="light"
            className="sidebar-section"
            breakpoint="lg"
            collapsedWidth="0"
          >
            <Posts />
          </Sider>
          <Content className="main-content">
            <PostDetail />
          </Content>
        </Layout>
        <Footer>©2019 David Ortega</Footer>
      </Layout>
    </div>
  );
}

export default App;
