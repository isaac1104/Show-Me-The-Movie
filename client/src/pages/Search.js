import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchNowPlayingMovies } from '../actions';
import SearchForm from '../components/SearchForm/SearchForm';

class Search extends Component {
  componentDidMount() {
    this.props.fetchNowPlayingMovies();
  };

  render() {
    console.log(this.props.now_playing_movies);
    return (
      <Fragment>
        <SearchForm />
      </Fragment>
    );
  }
}

function mapStateToProps({ now_playing_movies }) {
  return { now_playing_movies };
};

export default connect(mapStateToProps, { fetchNowPlayingMovies })(Search);
