import React, { Component } from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import { connect } from 'react-redux';
import { fetchMovieData } from '../actions';

class Search extends Component {
  componentDidUpdate(prevProps) {
    const { fetchMovieData, match: { params: { title } } } = this.props;
    if (prevProps.match.params.title !== title) {
      fetchMovieData(title);
    }
  };

  render() {
    console.log(this.props.movie_data);
    return (
      <div>
        <h1>Search</h1>
        <SearchForm />
        {this.props.match.params.title}
      </div>
    );
  }
}

function mapStateToProps({ movie_data }) {
  return { movie_data };
};

export default connect(mapStateToProps, { fetchMovieData })(Search);
