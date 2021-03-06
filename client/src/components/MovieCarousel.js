import React, { Component, Fragment } from 'react';
import MovieCard from './MovieCard/MovieCard';
import { Tag } from 'antd';
import Slider from 'react-slick';

class MovieCarousel extends Component {
  state = {
    width: null
  };

  updateWindowWidth = () => {
    this.setState({ width: window.innerWidth });
  }

  componentDidMount() {
    this.updateWindowWidth();
    window.addEventListener('resize', this.updateWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth);
  }

  render() {
    const { type, title, data, tagColor } = this.props;
    const settings = {
      arrows: false,
      draggable: false,
      autoplay: true,
      infinite: data.length > 4,
      speed: 1500
    };

    if (data && type === 'search') {
      const searchSettings = {
        ...settings,
        dots: this.state.width < 595 ? false: true,
        slidesToShow: 8,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1624,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 1292,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 760,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 594,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
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
          <Slider {...searchSettings}>
            {data.map(movie => (
              <div key={movie.id}>
                <MovieCard
                  movie={movie}
                  colWidth={'100%'}
                  cardWidth={'90%'}
                />
              </div>
            ))}
          </Slider>
        </Fragment>
      );
    }

    if (data && type === 'recommendation') {
      const recSettings = {
        ...settings,
        dots: this.state.width < 427 ? false : true,
        slidesToShow: 4,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 1302,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 757,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 591,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
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

      if (data.length < 4) {
        const setting = {
          ...settings,
          slidesToShow: 3,
          responsive: [
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 1302,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 757,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 591,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
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
        }
        return (
          <Fragment>
            <h3>{title}</h3>
            <Slider {...setting}>
              {data.map(movie => (
                <div key={movie.id}>
                  <MovieCard
                    movie={movie}
                    colWidth={'100%'}
                  />
                </div>
              ))}
            </Slider>
          </Fragment>
        );
      }

      return (
        <Fragment>
          <h3>{title}</h3>
          <Slider {...recSettings}>
            {data.map(movie => (
              <div key={movie.id}>
                <MovieCard
                  movie={movie}
                  colWidth={'100%'}
                />
              </div>
            ))}
          </Slider>
        </Fragment>
      );
    }

    return null;
  }
}

export default MovieCarousel;
