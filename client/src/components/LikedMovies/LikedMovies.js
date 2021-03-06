import React, { Component } from 'react';
import Spinner from '.././Spinner/Spinner';
import MovieCard from '.././MovieCard/MovieCard';
import { connect } from 'react-redux';
import { Button, Empty, Icon, Row } from 'antd';
import { fetchLikedMovies } from '../../actions';
import classes from './LikedMovies.module.css';

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
      return (
        <div className={classes.LikedMoviesContainer}>
          <Empty
            description={`You don't have any liked movies.`}
          >
            <Button
              type='primary'
              href='/search'
            >
              <Icon type='search' />Click here to search for a movie!
            </Button>
          </Empty>
        </div>
      );
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
