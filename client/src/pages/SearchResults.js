import React, { Component } from 'react';
import { Row } from 'antd';
import SearchForm from '../components/SearchForm/SearchForm';
import MovieDetails from '../components/MovieDetails';
import { connect } from 'react-redux';
import { fetchMovieData, resetMovieSearch } from '../actions';

class SearchResults extends Component {
  componentDidMount() {
    this.props.fetchMovieData(this.props.match.params.title);
  };

  componentDidUpdate(prevProps) {
    const { fetchMovieData, match: { params: { title } } } = this.props;
    if (prevProps.match.params.title !== title) {
      fetchMovieData(title);
    }
  };

  componentWillUnmount() {
    this.props.resetMovieSearch();
  };

  renderResults() {
    const { data: { results } } = this.props.movie_data;
    if (results) {
      return results.map(movie => {
        return (
          <MovieDetails
            key={movie.id}
            title={movie.title}
            release_date={movie.release_date}
            poster={movie.poster_path}
           />
        );
      });
    } else {
      return;
    }
  }

  render() {
    console.log(this.props.movie_data.data);
    return (
      <div>
        <SearchForm />
        <Row type='flex'>
          {this.renderResults()}
        </Row>
      </div>
    );
  }
}

function mapStateToProps({ movie_data }) {
  return { movie_data };
};

export default connect(mapStateToProps, { fetchMovieData, resetMovieSearch })(SearchResults);
