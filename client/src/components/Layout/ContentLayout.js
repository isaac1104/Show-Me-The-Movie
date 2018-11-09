import React, { Component } from 'react';
import moviesImage from '../../images/movies.jpg';
import { Layout } from 'antd';
const { Content } = Layout;

class ContentLayout extends Component {
  render() {
    const { pathname } = window.location;
    const style = {
      layout: {
        padding: '0 24px',
        alignItems: 'center',
        backgroundColor: pathname === '/' ? 'transparent' : '#f0f2f5',
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: pathname === '/' ? `url(${moviesImage})` : null
      },
      content: {
        backgroundColor: pathname === '/' ? 'transparent' : '#ffffff',
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
