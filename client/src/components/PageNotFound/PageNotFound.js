import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Typography } from 'antd';
import SignInButton from '.././SignInButton';

const { Title } = Typography;

class PageNotFound extends Component {
  renderErrorMsg() {
    const { data } = this.props.current_user;
    const styles = {
      container: {
        height: '90%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      },
      text: {
        marginTop: '15px',
        fontWeight: 'bold',
        textAlign: 'center'
      }
    };

    if (data) {
      return (
        <div style={styles.container}>
          <div>
            <Title level={3} style={styles.text}><span role='img' aria-label='stop'>🛑</span> Error: Page Not Found!</Title>
            <Title level={4} style={styles.text}>Please Navigate Using The Sidebar <span role='img' aria-label='point-left'>👈</span></Title>
          </div>
        </div>
      );
    }

    return (
      <div style={styles.container}>
        <div>
          <Title level={3} style={styles.text}><span role='img' aria-label='stop'>🛑</span> Error: Page Not Found!</Title>
          <Title level={4} style={styles.text}>Please Login First <span role='img' aria-label='point-down'>👇</span></Title>
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
