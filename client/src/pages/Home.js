import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions';

class Home extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  };

  render() {
    console.log(this.props.current_user);
    return (
      <div>
        <h1>Welcome, {this.props.current_user.data.username || 'Guest'}</h1>
      </div>
    );
  };
};

function mapStateToProps({ current_user }) {
  return { current_user };
};

export default connect(mapStateToProps, { fetchCurrentUser })(Home);
