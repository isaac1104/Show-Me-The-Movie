import React, { Fragment } from 'react';
import MovieCard from './MovieCard';
import { Tag } from 'antd';
import Slider from 'react-slick';

const settings = {
  arrows: false,
  dots: true,
  draggable: false,
  autoplay: true,
  infinite: true,
  speed: 1500,
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

const MovieCarousel = ({ title, data, tagColor }) => {
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

export default MovieCarousel;
