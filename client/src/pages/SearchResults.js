import React, { Component, Fragment } from 'react';
import { Icon, Pagination, Row, Spin } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SearchForm from '../components/SearchForm/SearchForm';
import MovieCard from '../components/MovieCard';
import { searchForMovies, resetMovieData } from '../actions';

class SearchResults extends Component {
  componentDidMount() {
    const { params: { title, page} } = this.props.match;
    this.props.searchForMovies(title, page);
  };

  componentDidUpdate(prevProps) {
    const { searchForMovies, match: { params: { title, page } } } = this.props;
    if (prevProps.match.params.title !== title || prevProps.match.params.page !== page) {
      searchForMovies(title, page);
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
    const { movie_data: { data }, match: { params : { title } } } = this.props;
    if (data) {
      return (
        <Pagination
          defaultCurrent={1}
          defaultPageSize={20}
          hideOnSinglePage
          total={data.total_results}
          onChange={page => this.props.history.push(`/search/${title}/${page}`)}
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
