import React, { Component, Fragment } from 'react';
import { Icon, Pagination, Row, Spin } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SearchForm from '../components/SearchForm/SearchForm';
import MovieCard from '../components/MovieCard';
import { searchForMovies, resetMovieData } from '../actions';

class SearchResults extends Component {
  componentDidMount() {
    this.props.searchForMovies(this.props.match.params.title, 1);
  };

  componentDidUpdate(prevProps) {
    const { searchForMovies, match: { params: { title } } } = this.props;
    if (prevProps.match.params.title !== title) {
      searchForMovies(title, 1);
    }
  };

  componentWillUnmount() {
    this.props.resetMovieData();
  };

  renderResults() {
    const { isFetching, data: { results } } = this.props.movie_data;
    if (isFetching) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '100%' }}>
          <Fragment>
            <Spin
              size='large'
              indicator={ <Icon type='loading' /> }
            />
          </Fragment>
        </div>
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
            rating={movie.vote_average}
          />
        );
      });
    } else {
      return null;
    }
  };

  renderPagination() {
    const { data } = this.props.movie_data;
    if (data) {
      return (
        <Pagination
          defaultCurrent={1}
          defaultPageSize={20}
          hideOnSinglePage
          total={data.total_results}
          onChange={page => this.props.searchForMovies(this.props.match.params.title, page)}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        />
      );
    } else {
      return <div />;
    }
  };

  render() {
    return (
      <Fragment>
        <SearchForm />
        <Row type='flex'>
          {this.renderResults()}
        </Row>
        {this.renderPagination()}
      </Fragment>
    );
  }
}

function mapStateToProps({ movie_data }) {
  return { movie_data };
};

export default connect(mapStateToProps, { searchForMovies, resetMovieData })(SearchResults);
