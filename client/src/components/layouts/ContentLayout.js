import React, { Component } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

class ContentLayout extends Component {
  render() {
    const { pathname } = window.location;
    const style = {
      layout: {
        padding: '0 24px',
        backgroundColor: pathname === '/' ? 'transparent' : '#f0f2f5',
        height: '100vh',
        overflow: 'hidden'
      },
      content: {
        backgroundColor: pathname === '/' ? 'transparent' : '#ffffff',
        padding: 24,
        margin: 0,
        width: '100%',
        height: '100%',
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
