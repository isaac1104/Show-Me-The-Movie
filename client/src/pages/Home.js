import React, { Component } from 'react';
import { Avatar } from 'antd';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions';

class Home extends Component {
  render() {
    const { data: { username, avatar } } = this.props.current_user;
    return (
      <div>
        <h1><Avatar src={avatar} /> Welcome, {username ? username.split(' ')[0] : 'Guest'}</h1>
      </div>
    );
  };
};

function mapStateToProps({ current_user }) {
  return { current_user };
};

export default connect(mapStateToProps, { fetchCurrentUser })(Home);
