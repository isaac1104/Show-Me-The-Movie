import React, { Component, Fragment } from 'react';
import { Button, Col, Divider, Icon, Rate, Row, Spin } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MovieDetail extends Component {
  componentDidMount() {
    this.props.fetchMovieData(this.props.match.params.id);
    this.props.fetchLikedMovies();
  };

  componentDidUpdate(prevProps) {
    const { fetchMovieData, fetchLikedMovies, match: { params: { id } } } = this.props;
    if (prevProps.match.params.id !== id) {
      fetchMovieData(id);
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
      return (
        <Rate
          character={<Icon type='heart' theme='filled' />}
          defaultValue={1}
          count={1}
          style={{ color: 'red' }}
          onChange={() => this.props.deleteLikedMovie(this.props.movie_data.data.id)}
        />
      );
    } else {
      return (
        <Rate
          character={<Icon type='heart' theme='filled' />}
          defaultValue={0}
          count={1}
          style={{ color: 'red' }}
          onChange={() => this.props.saveLikedMovie({
            title: this.props.movie_data.data.title,
            movieId: this.props.movie_data.data.id,
            rating: this.props.movie_data.data.vote_average,
            poster: this.props.movie_data.data.poster_path
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
                Release Date: {data.release_date}
                <Divider type='vertical'/>
                {data.runtime ? `Runtime: ${data.runtime} Min.` : 'Runtime: N/A'}
              </h4>
              <div>
                <Rate
                  allowHalf
                  disabled
                  defaultValue={data.vote_average / 2} />
                  ({data.vote_count ? `${data.vote_count} Votes` : ''})
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
            </Col>
          </Row>
        </Fragment>
      );
    }
  };

  render() {
    return (
      <Fragment>
        {this.renderMovieDetail()}
      </Fragment>
    );
  }
}

function mapStateToProps({ movie_data, liked_movies }) {
  return { movie_data, liked_movies };
};

export default connect(mapStateToProps, actions)(MovieDetail);
