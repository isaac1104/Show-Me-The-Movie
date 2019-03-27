import React, { Component } from 'react';
import { Avatar, Icon, Typography } from 'antd';
import { connect } from 'react-redux';
import { fetchTrendingMovies } from '../actions';
import MovieCarousel from '../components/MovieCarousel';
import Spinner from '../components/Spinner';

const { Title } = Typography;

class Home extends Component {
  componentDidMount() {
    this.props.fetchTrendingMovies();
  }

  render() {
    const { current_user: { data: { avatar, username } }, trending_movies } = this.props;

    if (trending_movies.isFetching) {
      return <Spinner />;
    }

    return (
      <div>
        <Title level={2}><Avatar src={avatar} /> Welcome, {username ? username.split(' ')[0] : 'Guest'}</Title>
        <Title level={4}><a href='/search'><Icon type='search' /> Search</a> for a movie to get started!</Title>
        <h1>Here are today's top 20 trending movies</h1>
        <MovieCarousel
          type='search'
          tagColor='#ff4f00'
          title='Trending'
          data={trending_movies.data}
        />
      </div>
    );
  };
};

function mapStateToProps({ current_user, trending_movies }) {
  return { current_user, trending_movies };
};

export default connect(mapStateToProps, { fetchTrendingMovies })(Home);
