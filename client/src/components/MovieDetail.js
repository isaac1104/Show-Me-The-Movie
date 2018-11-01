import React, { Component, Fragment } from 'react';
import { Button, Col, Divider, Icon, Row, Spin } from 'antd';
import { connect } from 'react-redux';
import { fetchMovieData, resetMovieData } from '../actions';

class MovieDetail extends Component {
  componentDidMount() {
    this.props.fetchMovieData(this.props.match.params.id);
  };

  componentDidUpdate(prevProps) {
    const { fetchMovieData, match: { params: { id } } } = this.props;
    if (prevProps.match.params.id !== id) {
      fetchMovieData(id);
    }
  };

  componentWillUnmount() {
    this.props.resetMovieData();
  };

  renderMovieDetail() {
    const { isFetching, data } = this.props.movie_data;
    if (isFetching) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spin
            size='large'
            style={{ margin: 'auto', marginTop: '30px' }}
            indicator={ <Icon type='loading' /> }
          />
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
              <h1>{data.title}</h1>
              <h4>{data.release_date} <Divider type='vertical'/> {data.runtime} Min.</h4>
              <Divider />
              <h3>Genres</h3>
              {data.genres ? data.genres.map(genre => {
                return <p key={genre.id}>{genre.name}</p>
              }) : 'N/A'}
              <Divider />
              <h3>Ratings</h3>
              <p>Average: {data.vote_average}</p>
              <p>Popularity: {data.popularity}</p>
              <Divider />
              <h3>Plot</h3>
              <p>{data.overview}</p>
            </Col>
          </Row>
        </Fragment>
      );
    }
  };

  render() {
    console.log(this.props.movie_data);
    return (
      <Fragment>
        {this.renderMovieDetail()}
      </Fragment>
    );
  }
}

function mapStateToProps({ movie_data }) {
  return { movie_data };
};

export default connect(mapStateToProps, { fetchMovieData, resetMovieData })(MovieDetail);
