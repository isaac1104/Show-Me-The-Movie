import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Typography } from 'antd';
import SignInButton from '.././SignInButton';
import classes from './PageNotFound.module.css';

const { Title } = Typography;

class PageNotFound extends Component {
  renderErrorMsg() {
    const { data } = this.props.current_user;

    if (data) {
      return (
        <div className={classes.PageNotFoundContainer}>
          <div>
            <Title level={3} className={classes.PageNotFoundText}><span role='img' aria-label='stop'>🛑</span> Error: Page Not Found!</Title>
            <Title level={4} className={classes.PageNotFoundText}>Please Navigate Using The Sidebar <span role='img' aria-label='point-left'>👈</span></Title>
          </div>
        </div>
      );
    }

    return (
      <div className={classes.PageNotFoundContainer}>
        <div>
          <Title level={3} className={classes.PageNotFoundText}><span role='img' aria-label='stop'>🛑</span> Error: Page Not Found!</Title>
          <Title level={4} className={classes.PageNotFoundText}>Please Login First <span role='img' aria-label='point-down'>👇</span></Title>
          <SignInButton platforms={[ 'Google', 'Facebook' ]} />
        </div>
      </div>
    );
  }

  render() {
    return <Fragment>{this.renderErrorMsg()}</Fragment>
  }
}

function mapStateToProps({ current_user }) {
  return { current_user };
};

export default connect(mapStateToProps, null)(PageNotFound);
