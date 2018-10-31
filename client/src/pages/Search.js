import React, { Component } from 'react';
import { Row } from 'antd';
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
        <h1>Search</h1>
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

export default connect(mapStateToProps, { fetchMovieData })(Search);
