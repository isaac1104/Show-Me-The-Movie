import React, { Component, Fragment } from 'react';
import { Row, Typography } from 'antd';
import { connect } from 'react-redux';
import SearchForm from '.././SearchForm/SearchForm';
import MovieCard from '.././MovieCard/MovieCard';
import Spinner from '.././Spinner/Spinner';
import MoviePagination from '.././MoviePagination/MoviePagination';
import SortDropdown from '.././SortDropdown/SortDropdown';
import { searchForMovies, resetMovieData, sortMovieData } from '../../actions';
import classes from './SearchResults.module.css';

const { Title } = Typography;

class SearchResults extends Component {
  componentDidMount() {
    const { searchForMovies, match : { params: { title, page} } } = this.props;
    searchForMovies(title, page);
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
      return <Spinner />;
    }

    if (results && results.length === 0) {
      return (
        <Title
          level={3}
          className={classes.SearchResultsNotFoundText}
        >
          <span role='img' aria-label='shrugg'>🤷‍</span> Hmm... Sorry, we couldn't find that. Please check for any spelling errors and try again!
        </Title>
      );
    }

    if (!results) return null;

    return results.map(movie => {
      return (
        <MovieCard
          key={movie.id}
          movie={movie}
          cardWidth={'90%'}
        />
      );
    });
  };

  render() {
    const { movie_data: { data, isFetching }, match: { params : { title, page } } } = this.props;

    return (
      <Fragment>
        <SearchForm />
        {isFetching ? null : (
          <div className={classes.SearchResultsFound}>
            <h3 className={classes.SearchResultsText}>{data.total_results} Result(s) Found</h3>
            <SortDropdown />
          </div>
        )}
        <Row type='flex'>
          {this.renderResults()}
        </Row>
        <MoviePagination
          data={data}
          title={title}
          page={page}
         />
      </Fragment>
    );
  }
}

function mapStateToProps({ movie_data }) {
  return { movie_data };
};

export default connect(mapStateToProps, { searchForMovies, resetMovieData, sortMovieData })(SearchResults);
