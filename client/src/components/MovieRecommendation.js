import React, { Component, Fragment } from 'react';
import MovieCard from './MovieCard';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { fetchRecommendedMovies } from '../actions';

class MovieRecommendation extends Component {
  componentDidMount() {
    this.props.fetchRecommendedMovies(this.props.movieId);
  };

  componentDidUpdate(prevProps) {
    const { fetchRecommendedMovies, movieId } = this.props;
    if (prevProps.movieId !== movieId) {
      fetchRecommendedMovies(movieId);
    }
  };

  renderRecommendedMovies() {
    const { data: { results } } = this.props.recommended_movies;
    if (results) {
      const settings = {
        arrows: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
      };

      return (
        <Slider {...settings}>
          {results.map(movie => {
            return (
              <div key={movie.id}>
                <MovieCard
                  keyword={this.props.title}
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
      );
    }
  };

  render() {
    return (
      <Fragment>
        <h3>Recommeded Movies:</h3>
        {this.renderRecommendedMovies()}
      </Fragment>
    );
  }
};

function mapStateToProps({ recommended_movies }) {
  return { recommended_movies };
};

export default connect(mapStateToProps, { fetchRecommendedMovies })(MovieRecommendation);
