import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchNowPlayingMovies, fetchPopularMovies } from '../actions';
import { Icon, Spin, Tag} from 'antd';
import Slider from 'react-slick';
import SearchForm from '../components/SearchForm/SearchForm';
import MovieCard from '../components/MovieCard';

class Search extends Component {
  componentDidMount() {
    this.props.fetchNowPlayingMovies();
    this.props.fetchPopularMovies();
  };

  renderNowPlayingMovies() {
    const { data: { results } } = this.props.now_playing_movies;
    if (results) {
      const settings = {
        arrows: false,
        dots: true,
        draggable: false,
        autoplay: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 8,
        slidesToScroll: 8,
        responsive: [
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 8,
              slidesToScroll: 8
            }
          },
          {
            breakpoint: 1440,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6
            }
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
      return (
        <Fragment>
          <Tag color='#ff4f00' style={{ marginTop: '15px' }}>Now Playing</Tag>
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

  renderPopularMovies() {
    const { data: { results } } = this.props.popular_movies;
    if (results) {
      const settings = {
        arrows: false,
        dots: true,
        draggable: false,
        autoplay: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 8,
        slidesToScroll: 8,
        responsive: [
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 8,
              slidesToScroll: 8
            }
          },
          {
            breakpoint: 1440,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6
            }
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
      return (
        <Fragment>
          <Tag color='#1890ff' style={{ marginTop: '15px' }}>Top 20 Popular Movies</Tag>
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
        {this.props.now_playing_movies.isFetching || this.props.popular_movies.isFetching
          ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '100%' }}>
              <Fragment>
                <Spin
                  size='large'
                  indicator={ <Icon type='loading' /> }
                />
              </Fragment>
            </div>
          )
          : (
            <Fragment>
              {this.renderNowPlayingMovies()}
              {this.renderPopularMovies()}
            </Fragment>
          )
        }
      </Fragment>
    );
  }
}

function mapStateToProps({ now_playing_movies, popular_movies }) {
  return { now_playing_movies, popular_movies };
};

export default connect(mapStateToProps, { fetchNowPlayingMovies, fetchPopularMovies })(Search);
