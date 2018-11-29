import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GoogleButton from '../components/GoogleButton';
import FacebookButton from '../components/FacebookButton';

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
            <h1 style={styles.text}>🛑 Error: Page Not Found!</h1>
            <h2 style={styles.text}>Please Navigate Using The Sidebar 👈</h2>
          </div>
        </div>
      );
    }

    return (
      <div style={styles.container}>
        <div>
          <h1 style={styles.text}>🛑 Error: Page Not Found!</h1>
          <h2 style={styles.text}>Please Login First 👇</h2>
          <GoogleButton />
          <FacebookButton />
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
