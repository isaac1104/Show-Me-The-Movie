import React, { Component, Fragment } from 'react';
import { Button, Col, Divider, Icon, Rate, Row, Spin } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MovieDetail extends Component {
  componentDidMount() {
    this.props.fetchMovieData(this.props.match.params.id);
    this.props.fetchRecommendedMovies(this.props.match.params.id);
    this.props.fetchLikedMovies();
  };

  componentDidUpdate(prevProps) {
    const { fetchMovieData, fetchLikedMovies, fetchRecommendedMovies, match: { params: { id } } } = this.props;
    if (prevProps.match.params.id !== id) {
      fetchMovieData(id);
      fetchRecommendedMovies(id);
      fetchLikedMovies();
    }
  };

  componentWillUnmount() {
    this.props.resetMovieData();
  };

  renderLikeIcon() {
    const { liked_movies: { data }, match: { params: { id } } } = this.props;
    const savedMovie = data.find(movie => movie.movieId === parseInt(id, 10));
    if (savedMovie !== undefined) {
      const { data } = this.props.movie_data;
      return (
        <Rate
          character={<Icon type='heart' theme='filled' />}
          defaultValue={1}
          count={1}
          style={{ color: 'red' }}
          onChange={() => this.props.deleteLikedMovie(data.id)}
        />
      );
    } else {
      const { data } = this.props.movie_data;
      return (
        <Rate
          character={<Icon type='heart' theme='filled' />}
          defaultValue={0}
          count={1}
          style={{ color: 'red' }}
          onChange={() => this.props.saveLikedMovie({
            title: data.title,
            movieId: data.id,
            rating: data.vote_average,
            poster: data.poster_path,
            releaseDate: data.release_date
          })}
        />
      );
    }
  };

  renderMovieDetail() {
    const { isFetching, data } = this.props.movie_data;
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

    if (data) {
      return (
        <Fragment>
          <Button
            type="primary"
            shape="circle"
            icon="left"
            size='large'
            onClick={() => this.props.history.goBack()}
          />
          <Row type='flex'>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex' }}>
              <img
                src={data.poster_path ? `http://image.tmdb.org/t/p/w185/${data.poster_path}` : 'https://via.placeholder.com/300?text=Poster+Not+Available' }
                alt='movie poster'
                style={{ margin: 'auto', width: '50%' }}
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <h1>
                {data.title}
                <Divider type='vertical' />
                {this.renderLikeIcon()}
              </h1>
              <h4>
                Release Date: {data.release_date ? data.release_date : 'N/A'}
                <Divider type='vertical'/>
                Runtime: {data.runtime ? `${data.runtime} Min.` : 'N/A'}
              </h4>
              <div>
                <Rate
                  allowHalf
                  disabled
                  defaultValue={data.vote_average / 2} />
                  {data.vote_count ? `(${data.vote_count} Votes)` : ''}
              </div>
              <Divider />
              <h3>Genres:</h3>
              {data.genres && data.genres.length !== 0 ? data.genres.map(genre => {
                return <li key={genre.id}>{genre.name}</li>
              }) : 'N/A'}
              <Divider />
              <h3>Plot:</h3>
              <p>{data.overview ? data.overview : 'N/A'}</p>
              <p>{data.tagline ? `"${data.tagline}"` : ''}</p>
              <Divider />
              <h3>Recommended Movies:</h3>
            </Col>
          </Row>
        </Fragment>
      );
    }
  };

  render() {
    console.log(this.props.recommended_movies);
    return (
      <Fragment>
        {this.renderMovieDetail()}
      </Fragment>
    );
  }
}

function mapStateToProps({ movie_data, liked_movies, recommended_movies }) {
  return { movie_data, liked_movies, recommended_movies };
};

export default connect(mapStateToProps, actions)(MovieDetail);
