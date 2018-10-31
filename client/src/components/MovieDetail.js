import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovieData, resetMovieData } from '../actions';

class MovieDetail extends Component {
  componentDidMount() {
    this.props.fetchMovieData(this.props.match.params.id);
  };

  componentDidUpdate(prevProps) {
    const { fetchMovieData, match: { params: { id } } } = this.props;
    if (prevProps.match.params.id !== id) {
      fetchMovieData(id);
    }
  };

  componentWillUnmount() {
    this.props.resetMovieData();
  };

  render() {
    console.log(this.props.movie_data);
    return (
      <div>
        <h1>{this.props.match.params.id}</h1>
      </div>
    );
  }
}

function mapStateToProps({ movie_data }) {
  return { movie_data };
};

export default connect(mapStateToProps, { fetchMovieData, resetMovieData })(MovieDetail);
