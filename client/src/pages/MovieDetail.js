import React, { Component, Fragment } from 'react';
import Spinner from '../components/Spinner';
import LikeIcon from '../components/LikeIcon';
import MovieCarousel from '../components/MovieCarousel';
import { Button, Col, Divider, Rate, Row, Tag, Icon, Modal } from 'antd';
import { SimpleImg } from 'react-simple-img';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MovieDetail extends Component {
  state = {
    visible: false
  };

  componentDidMount() {
    const { fetchMovieData, fetchRecommendedMovies, fetchLikedMovies, match: { params: { id } } } = this.props;
    fetchMovieData(id);
    fetchRecommendedMovies(id);
    fetchLikedMovies();
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

  handleModalOpen = () => {
    this.setState({ visible: true });
  }

  handleModalClose = () => {
    this.setState({ visible: false });
  }

  renderTrailerModal() {
    const { data: { trailer } } = this.props.movie_data;
    if (trailer) {
      return (
        <Modal
          title={trailer.name}
          visible={this.state.visible}
          closable={false}
          onCancel={this.handleModalClose}
          destroyOnClose
          footer={[
            <Button key='close' onClick={this.handleModalClose}>Close</Button>
          ]}
        >
          <iframe
            title='trailer'
            width='100%'
            height='315'
            src={`https://www.youtube.com/embed/${trailer.key}`}
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </Modal>
      );
    }

    return null;
  }

  renderMovieDetail() {
    const { movie_data: { isFetching, data }, liked_movies, recommended_movies } = this.props;
    if (isFetching || recommended_movies.isFetching) {
      return <Spinner />;
    }

    if (data) {
      const styles = {
        column: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '30px'
        }
      };

      return (
        <Fragment>
          <Button
            type='primary'
            shape='circle'
            icon='left'
            size='large'
            onClick={() => this.props.history.goBack()}
          />
          <Row type='flex' gutter={16}>
            <Col xs={24} sm={24} md={10} lg={10} xl={10} style={styles.column}>
              <SimpleImg
                height={700}
                src={data.poster_path ? `https://image.tmdb.org/t/p/w185/${data.poster_path}` : 'https://via.placeholder.com/300?text=Poster+Not+Available' }
                alt='movie-poster'
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <h1>
                {data.trailer ? (
                  <Fragment>
                    <Icon
                      type='video-camera'
                      theme='twoTone'
                      onClick={this.handleModalOpen}
                    />
                    <Divider type='vertical' />
                  </Fragment>
                ): null}
                {this.renderTrailerModal()}
                {data.title}
                <Divider type='vertical' />
                <LikeIcon
                  likedMovies={liked_movies.data}
                  movieData={data}
                  saveLikedMovie={this.props.saveLikedMovie}
                  deleteLikedMovie={this.props.deleteLikedMovie}
                />
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
              <div style={{ marginTop: '15px' }}>
                {data.genres && data.genres.length !== 0 ? data.genres.map(genre => {
                  return <Tag key={genre.id} color='#1890ff'>{genre.name}</Tag>;
                }) : 'N/A'}
              </div>
              <Divider />
              <h3>Plot:</h3>
              <p>{data.overview ? data.overview : 'N/A'}</p>
              <p>{data.tagline ? `'${data.tagline}'` : ''}</p>
              <Divider />
              <MovieCarousel
                type='recommendation'
                title='Recommended Movies:'
                data={this.props.recommended_movies.data.results}
              />
            </Col>
          </Row>
        </Fragment>
      );
    }

    return null;
  };

  render() {
    return (
      <Fragment>
        {this.renderMovieDetail()}
      </Fragment>
    );
  };
}

function mapStateToProps({ movie_data, liked_movies, recommended_movies }) {
  return { movie_data, liked_movies, recommended_movies };
};

export default connect(mapStateToProps, actions)(MovieDetail);
