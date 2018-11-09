import React, { Component } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

class ContentLayout extends Component {
  render() {
    const { pathname } = window.location;
    const style = {
      layout: {
        padding: '0 24px',
        alignItems: 'center',
        backgroundColor: pathname === '/' ? '#36393f' : '#ffffff',
        height: '100vh',
        overflow: 'hidden'
      },
      content: {
        backgroundColor: pathname === '/' ? '#36393f' : '#ffffff',
        padding: 24,
        margin: 0,
        width: '100%',
        overflowY: pathname === '/' ? 'hidden' : 'scroll'
      }
    };

    return (
      <Layout style={style.layout}>
        <Content style={style.content}>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}

export default ContentLayout;
