import React, { Component } from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import MovieDetails from '../components/MovieDetails';
import { connect } from 'react-redux';
import { fetchMovieData } from '../actions';

class Search extends Component {
  componentDidMount() {
    this.props.fetchMovieData(this.props.match.params.title);
  };

  componentDidUpdate(prevProps) {
    const { fetchMovieData, match: { params: { title } } } = this.props;
    if (prevProps.match.params.title !== title) {
      fetchMovieData(title);
    }
  };

  renderResults() {
    const { data: { results } } = this.props.movie_data;
    if (results) {
      return results.map(result => {
        return <MovieDetails key={result.id} title={result.title} release_date={result.release_date} />
      });
    } else {
      return;
    }
  }

  render() {
    console.log(this.props.movie_data.data);
    return (
      <div>
        <h1>Search</h1>
        <SearchForm />
        {this.renderResults()}
      </div>
    );
  }
}

function mapStateToProps({ movie_data }) {
  return { movie_data };
};

export default connect(mapStateToProps, { fetchMovieData })(Search);
