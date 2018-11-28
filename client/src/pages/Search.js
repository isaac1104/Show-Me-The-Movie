import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchNowPlayingMovies, fetchPopularMovies } from '../actions';
import MovieCarousel from '../components/MovieCarousel';
import SearchForm from '../components/SearchForm/SearchForm';
import Spinner from '../components/Spinner';

class Search extends Component {
  componentDidMount() {
    this.props.fetchNowPlayingMovies();
    this.props.fetchPopularMovies();
  };

  renderMovieData() {
    const { now_playing_movies, popular_movies } = this.props;
    if (!now_playing_movies.data.results || !popular_movies.data.results) {
      return <Spinner />;
    }

    return (
      <Fragment>
        <MovieCarousel title={'Top 20 Popular Movies'} data={popular_movies.data.results} tagColor='#1890ff' />
        <MovieCarousel title={'Now Playing'} data={now_playing_movies.data.results} tagColor='#ff4f00' />
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        <SearchForm />
        {this.renderMovieData()}
      </Fragment>
    );
  }
}

function mapStateToProps({ now_playing_movies, popular_movies }) {
  return { now_playing_movies, popular_movies };
};

export default connect(mapStateToProps, { fetchNowPlayingMovies, fetchPopularMovies })(Search);
