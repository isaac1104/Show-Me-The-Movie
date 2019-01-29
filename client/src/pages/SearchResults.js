import React, { Component, Fragment } from 'react';
import { Row, Select } from 'antd';
import { connect } from 'react-redux';
import SearchForm from '../components/searchForms/SearchForm';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import MoviePagination from '../components/MoviePagination';
import { searchForMovies, resetMovieData, sortMovieData } from '../actions';

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
      const styles = {
        text: {
          marginTop: '15px',
          fontWeight: 'bold'
        }
      };

      return <h1 style={styles.text}><span role='img' aria-label='shrugg'>🤷‍</span> Hmm... Sorry, we couldn't find that. Please check for any spelling errors and try again!</h1>;
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

  renderDropdown() {
    return (
      <Select
        style={{ width: 120 }}
        placeholder='Sort By'
        onChange={value => this.props.sortMovieData(value)}
        >
        <Select.Option value='vote_average'>Rating</Select.Option>
        <Select.Option value='popularity'>Popularity</Select.Option>
      </Select>
    );
  }

  render() {
    const { movie_data: { data, isFetching }, match: { params : { title, page } } } = this.props;
    return (
      <Fragment>
        <SearchForm />
        {isFetching ? null : (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ marginTop: '15px' }}>{data.total_results} Result(s) Found</h3>
            {this.renderDropdown()}
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
