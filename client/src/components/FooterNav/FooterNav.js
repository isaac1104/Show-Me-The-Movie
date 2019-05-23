import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Divider, Icon, Layout } from 'antd';
import classes from './FooterNav.module.css';
const { Footer } = Layout;

class FooterNav extends Component {
  renderFooter() {
    const { data } = this.props.current_user;
    if (!data) {
      return (
        <Footer className={classes.FooterNav}>
          {`Show Me The Movie ©${new Date().getFullYear()} by Isaac Kwon`}
          <Divider type='vertical'/>
          <a href='https://github.com/isaac1104'>
            <Icon type='github'/>
          </a>
          <Divider type='vertical'/>
          <a href='https://www.linkedin.com/in/isaac-kwon/'>
            <Icon type='linkedin'/>
          </a>
        </Footer>
      );
    } else {
      return null;
    }
  }

  render() {
    return <Fragment>{this.renderFooter()}</Fragment>;
  }
}

function mapStateToProps({ current_user }) {
  return { current_user };
};

export default connect(mapStateToProps, null)(FooterNav);
