import React, { Component, Fragment } from 'react';
import { Icon, Row, Spin } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SearchForm from '../components/SearchForm/SearchForm';
import MovieCard from '../components/MovieCard';
import { searchForMovies, resetMovieData } from '../actions';

class SearchResults extends Component {
  componentDidMount() {
    this.props.searchForMovies(this.props.match.params.title);
  };

  componentDidUpdate(prevProps) {
    const { searchForMovies, match: { params: { title } } } = this.props;
    if (prevProps.match.params.title !== title) {
      searchForMovies(title);
    }
  };

  componentWillUnmount() {
    this.props.resetMovieData();
  };

  renderResults() {
    const { isFetching, data: { results } } = this.props.movie_data;
    if (isFetching) {
      return (
        <Spin
          size='large'
          style={{ margin: 'auto' }}
          indicator={ <Icon type='loading' style={{ marginTop: '30px' }} /> }
        />
      );
    }

    if (results && results.length === 0) {
      return <Redirect to='/notfound' />;
    }

    if (results) {
      return results.map(movie => {
        return (
          <MovieCard
            key={movie.id}
            keyword={this.props.match.params.title}
            id={movie.id}
            title={movie.title}
            release_date={movie.release_date}
            poster={movie.poster_path}
          />
        );
      });
    } else {
      return null;
    }
  };

  render() {
    return (
      <Fragment>
        <SearchForm />
        <Row type='flex'>
          {this.renderResults()}
        </Row>
      </Fragment>
    );
  }
}

function mapStateToProps({ movie_data }) {
  return { movie_data };
};

export default connect(mapStateToProps, { searchForMovies, resetMovieData })(SearchResults);
