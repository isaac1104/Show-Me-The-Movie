import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;
const style = {
  layout: {
    padding: '0 24px',
    alignItems: 'center',
    backgroundColor: '#2f3136'
  },
  content: {
    backgroundColor: '#36393f',
    padding: 24,
    margin: 0,
    width: '100%'
  }
};

const ContentLayout = props => {
  return (
    <Layout style={style.layout}>
      <Content style={style.content}>
        {props.children}
      </Content>
    </Layout>
  );
}

export default ContentLayout;
