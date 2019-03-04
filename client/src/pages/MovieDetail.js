import React, { Component, Fragment } from 'react';
import Spinner from '../components/Spinner';
import LikeIcon from '../components/LikeIcon';
import MovieCarousel from '../components/MovieCarousel';
import { Button, Col, Divider, Rate, Row, Tag, Icon, Modal } from 'antd';
import { SimpleImg } from 'react-simple-img';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MovieDetail extends Component {
  state = {
    visible: false
  };

  componentDidMount() {
    const { fetchMovieData, fetchLikedMovies, match: { params: { id } } } = this.props;
    fetchMovieData(id);
    fetchLikedMovies();
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
          width={1040}
          closable={false}
          onCancel={this.handleModalClose}
          destroyOnClose
          footer={[
            <Button key='close' onClick={this.handleModalClose}>Close</Button>
          ]}
        >
          <ReactPlayer
            url={`https://www.youtube.com/embed/${trailer.key}`}
            playing
            controls
            width='100%'
            height={500}
          />
        </Modal>
      );
    }

    return null;
  }

  renderMovieDetail() {
    const { movie_data: { isFetching, data }, liked_movies } = this.props;
    if (isFetching) {
      return <Spinner />;
    }

    if (data && data.recommended) {
      const styles = {
        column: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '30px'
        },
        noPoster: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          height: '680px',
          width: '468px',
          backgroundColor: '#f0f2f5'
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
              {data.poster_path ? (
                <SimpleImg
                  height={700}
                  src={`https://image.tmdb.org/t/p/w185/${data.poster_path}`}
                  alt='movie-poster'
                />
              ) : (
                <div style={styles.noPoster}>
                  <h1>Poster Not Available</h1>
                </div>
              )}
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
                data={data.recommended.results}
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

function mapStateToProps({ movie_data, liked_movies }) {
  return { movie_data, liked_movies };
};

export default connect(mapStateToProps, actions)(MovieDetail);
