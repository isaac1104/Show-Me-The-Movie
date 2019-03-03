import React, { Component } from 'react';
import { Avatar, Icon } from 'antd';
import { connect } from 'react-redux';
import { fetchTrendingMovies } from '../actions';

class Home extends Component {
  componentDidMount() {
    this.props.fetchTrendingMovies();
  }

  render() {
    console.log(this.props.trending_movies);
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

function mapStateToProps({ current_user, trending_movies }) {
  return { current_user, trending_movies };
};

export default connect(mapStateToProps, { fetchTrendingMovies })(Home);
