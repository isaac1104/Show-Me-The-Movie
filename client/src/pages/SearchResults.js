import React, { Component } from 'react';
import { Icon, Row, Spin } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SearchForm from '../components/SearchForm/SearchForm';
import MovieDetails from '../components/MovieDetails';
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
    const { isFetching, data: { results } } = this.props.movie_data;
    if (isFetching) {
      return (
        <Spin
          size='large'
          style={{ margin: 'auto', marginTop: '30px' }}
          indicator={
            <Icon
              type='loading'
              style={{ fontSize: '150px' }}
            />
          }
        />
      )
    }

    if (results && results.length === 0) {
      return <Redirect to='/notfound' />;
    }

    if (!results) {
      return <Redirect to='/notfound' />;
    }

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
    console.log(this.props.movie_data);
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
