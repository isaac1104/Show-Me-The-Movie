import React, { Component, Fragment } from 'react';
import MovieCard from '../components/MovieCard';
import { connect } from 'react-redux';
import { Icon, Row, Spin } from 'antd';
import { fetchLikedMovies } from '../actions';

class LikedMovies extends Component {
  componentDidMount() {
    this.props.fetchLikedMovies();
  };

  renderLikedMovies() {
    const { isFetching, data } = this.props.liked_movies;

    if (isFetching) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '100%' }}>
          <Fragment>
            <Spin
              size='large'
              indicator={ <Icon type='loading' /> }
            />
          </Fragment>
        </div>
      );
    }

    if (data.length === 0) {
      return <h1>You Don't Have Any Liked Movies</h1>
    }

    if (data) {
      return data.map(movie => {
        return (
          <MovieCard
            key={movie.movieId}
            id={movie.movieId}
            title={movie.title}
            release_date={movie.releaseDate}
            poster={movie.poster}
            rating={movie.rating}
          />
        );
      });
    }
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
