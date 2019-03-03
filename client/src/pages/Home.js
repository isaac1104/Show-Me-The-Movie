import React, { Component } from 'react';
import { Avatar, Icon } from 'antd';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    const { data: { username, avatar } } = this.props.current_user;
    return (
      <div>
        <h1><Avatar src={avatar} /> Welcome, {username ? username.split(' ')[0] : 'Guest'}</h1>
        <h1><a href='/search'><Icon type='search' /> Search</a> for a movie to get started!</h1>
        <h1>Here are today's top 20 trending movies</h1>
      </div>
    );
  };
};

function mapStateToProps({ current_user }) {
  return { current_user };
};

export default connect(mapStateToProps, null)(Home);
