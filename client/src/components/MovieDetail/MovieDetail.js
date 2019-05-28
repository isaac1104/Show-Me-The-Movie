import React, { Component, Fragment } from 'react';
import { Button, Col, Divider, Rate, Row, Tag, Icon, Modal, Empty, Popover, Typography } from 'antd';
import { SimpleImg } from 'react-simple-img';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import Spinner from '.././Spinner/Spinner';
import LikeIcon from '.././LikeIcon/LikeIcon';
import MovieCarousel from '.././MovieCarousel';
import * as actions from '../../actions';
import classes from './MovieDetail.module.css';

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

  toggleTrailerModal = () => {
    this.setState({ visible: !this.state.visible });
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
          onCancel={this.toggleTrailerModal}
          destroyOnClose
          footer={[
            <Button key='close' onClick={this.toggleTrailerModal}>Close</Button>
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
            <Col xs={24} sm={24} md={24} lg={24} xl={10} className={classes.MovieDetailColumn}>
              {data.poster_path ? (
                <SimpleImg
                  className={classes.MovieDetailPoster}
                  src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                  alt={data.original_title}
                  width='100%'
                  height='100%'
                />
              ) : (
                <div className={classes.MovieDetailNoPoster}>
                  <Empty
                    image={<Icon type='picture' className={classes.MovieDetailXIcon} />}
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
                        onClick={this.toggleTrailerModal}
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
              <div>&nbsp;</div>
              <Typography><i>{data.tagline ? `'${data.tagline}'` : ''}</i></Typography>
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
