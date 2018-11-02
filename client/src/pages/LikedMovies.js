import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLikedMovies } from '../actions';

class LikedMovies extends Component {
  componentDidMount() {
    this.props.fetchLikedMovies();
  };

  render() {
    console.log(this.props.liked_movies);
    return (
      <div>
        <h1>Liked Movies</h1>
      </div>
    );
  }
}

function mapStateToProps({ liked_movies }) {
  return { liked_movies };
};

export default connect(mapStateToProps, { fetchLikedMovies })(LikedMovies);
