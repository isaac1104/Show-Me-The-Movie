import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchNowPlayingMovies } from '../actions';
import { Icon, Spin, Tag} from 'antd';
import Slider from 'react-slick';
import SearchForm from '../components/SearchForm/SearchForm';
import MovieCard from '../components/MovieCard';

class Search extends Component {
  componentDidMount() {
    this.props.fetchNowPlayingMovies();
  };

  renderNowPlayingMovies() {
    const { isFetching, data: { results } } = this.props.now_playing_movies;
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

    if (results) {
      const settings = {
        arrows: true,
        draggable: false,
        autoplay: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 8,
        slidesToScroll: 8
      };
      return (
        <Fragment>
          <Tag color='#1890ff' style={{ marginTop: '15px' }}>Now Playing: </Tag>
          <Slider {...settings}>
            {results.map(movie => {
              return (
                <div key={movie.id}>
                  <MovieCard
                    id={movie.id}
                    title={movie.title}
                    release_date={movie.release_date}
                    poster={movie.poster_path}
                    rating={movie.vote_average}
                    width={'100%'}
                  />
                </div>
              );
            })}
          </Slider>
        </Fragment>
      );
    }
  };

  render() {
    return (
      <Fragment>
        <SearchForm />
        {this.renderNowPlayingMovies()}
      </Fragment>
    );
  }
}

function mapStateToProps({ now_playing_movies }) {
  return { now_playing_movies };
};

export default connect(mapStateToProps, { fetchNowPlayingMovies })(Search);
