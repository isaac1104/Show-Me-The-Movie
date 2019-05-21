import React, { Component, Fragment } from 'react';
import { Button, Col, Divider, Rate, Row, Tag, Icon, Modal, Empty, Popover, Typography } from 'antd';
import { SimpleImg } from 'react-simple-img';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';
import LikeIcon from '../components/LikeIcon';
import MovieCarousel from '../components/MovieCarousel';
import * as actions from '../actions';

const { Title } = Typography;

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
  }

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
          alignItems: 'flex-start',
          margin: '1em 0 1em 0'
        },
        noPoster: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          height: '680px',
          width: '468px',
          backgroundColor: '#f0f2f5'
        },
        xIcon: {
          fontSize: '5em'
        },
        text: {
          fontSize: '1em'
        }
      };

      return (
        <Fragment>
          <Button
            type='danger'
            shape='circle'
            icon='caret-left'
            size='large'
            onClick={() => this.props.history.goBack()}
          />
          <Row type='flex' gutter={16}>
            <Col xs={24} sm={24} md={24} lg={24} xl={10} style={styles.column}>
              {data.poster_path ? (
                <SimpleImg
                  className='movie-poster'
                  src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                  alt={data.original_title}
                  width='100%'
                  height='100%'
                />
              ) : (
                <div style={styles.noPoster}>
                  <Empty
                    image={<Icon type='picture' style={styles.xIcon} />}
                    description='Poster Not Available'
                  />
                </div>
              )}
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Title level={4}>
                {data.trailer ? (
                  <Fragment>
                    <Popover content={'Trailer'}>
                      <Icon
                        type='video-camera'
                        theme='twoTone'
                        onClick={this.handleModalOpen}
                      />
                    </Popover>
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
              </Title>
              <h3>
                Release Date: {data.release_date ? data.release_date : 'N/A'}
                <Divider type='vertical'/>
                Runtime: {data.runtime ? `${data.runtime} Min.` : 'N/A'}
              </h3>
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
              <Typography>{data.overview ? data.overview : 'N/A'}</Typography>
              <Typography>{data.tagline ? `'${data.tagline}'` : ''}</Typography>
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
