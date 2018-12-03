import React, { Component } from 'react';
import Spinner from '../components/Spinner';
import MovieCard from '../components/MovieCard';
import { connect } from 'react-redux';
import { Row } from 'antd';
import { fetchLikedMovies } from '../actions';

class LikedMovies extends Component {
  componentDidMount() {
    this.props.fetchLikedMovies();
  };

  renderLikedMovies() {
    const { isFetching, data } = this.props.liked_movies;

    if (isFetching) {
      return <Spinner />;
    }

    if (data.length === 0) {
      return <h1>You Don't Have Any Liked Movies</h1>
    }

    return data.map(movie => {
      return (
        <MovieCard
          key={movie.movieId}
          movie={movie}
          cardWidth={'90%'}
        />
      );
    });
  };

  render() {
    return (
      <Row type='flex'>
        {this.renderLikedMovies()}
      </Row>
    );
  }
}

function mapStateToProps({ liked_movies }) {
  return { liked_movies };
};

export default connect(mapStateToProps, { fetchLikedMovies })(LikedMovies);
