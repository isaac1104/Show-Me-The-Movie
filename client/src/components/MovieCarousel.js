import React, { Fragment } from 'react';
import MovieCard from './MovieCard';
import { Tag } from 'antd';
import Slider from 'react-slick';

const MovieCarousel = ({ type, title, data, tagColor }) => {
  if (data && type === 'search') {
    const settings = {
      arrows: false,
      dots: window.innerWidth < 595 ? false: true,
      draggable: false,
      autoplay: true,
      infinite: true,
      speed: 1500,
      slidesToShow: 8,
      slidesToScroll: 8,
      responsive: [
        {
          breakpoint: 1624,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6
          }
        },
        {
          breakpoint: 1292,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 760,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 594,
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
        <Tag color={tagColor} style={{ marginTop: '15px' }}>{title}</Tag>
        <Slider {...settings}>
          {data.map(movie => {
            return (
              <div key={movie.id}>
                <MovieCard
                  movie={movie}
                  colWidth={'100%'}
                  cardWidth={'90%'}
                />
              </div>
            );
          })}
        </Slider>
      </Fragment>
    );
  }

  if (data && type === 'recommendation') {
    const settings = {
      arrows: false,
      dots: window.innerWidth < 396 ? false : true,
      draggable: false,
      autoplay: true,
      infinite: true,
      speed: 1500,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 1302,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 757,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 591,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 426,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    if (data.length === 0) {
      return <h3>Recommeded Movies: N/A</h3>;
    }

    if (data.length <= 4) {
      return (
        <Fragment>
          <h3>{title}</h3>
          {data.map(movie => {
            return (
              <div key={movie.id}>
                  <MovieCard
                  movie={movie}
                  colWidth={'25%'}
                />
              </div>
            );
          })}
        </Fragment>
      );
    }

    return (
      <Fragment>
        <h3>{title}</h3>
        <Slider {...settings}>
          {data.map(movie => {
            return (
              <div key={movie.id}>
                <MovieCard
                  movie={movie}
                  colWidth={'100%'}
                />
              </div>
            );
          })}
        </Slider>
      </Fragment>
    );
  }

  return null;
}

export default MovieCarousel;
