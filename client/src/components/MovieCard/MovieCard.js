import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Col, Rate } from 'antd';
import { SimpleImg } from 'react-simple-img';
import classes from './MovieCard.module.css';

const { Meta } = Card;

class MovieCard extends Component {
  render() {
    const styles = {
      col: {
        width: this.props.colWidth
      },
      card: {
        width: this.props.cardWidth
      }
    };

    const { title, release_date, releaseDate, poster, poster_path, vote_average, rating, movieId, id } = this.props.movie;
    return (
      <Col xs={24} sm={12} md={6} lg={6} xl={4} xxl={3} className={classes.MovieCardCol} style={styles.col}>
        <Card
          hoverable
          cover={
            <SimpleImg
              width={180}
              height={240}
              applyAspectRatio
              src={
                poster
                  ? `https://image.tmdb.org/t/p/w500/${poster}`
                  : poster_path
                    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                    : 'https://via.placeholder.com/300/f0f2f5/000000?text=Poster+Not+Available'
              }
              alt={title}
            />
          }
          onClick={() => this.props.history.push(`/movie/${movieId ? movieId : id }`)}
          style={styles.card}
          className={classes.MovieCard}
        >
          <Meta
            title={title}
            description={release_date ? release_date : releaseDate}
          />
          <Meta
            description={
              <Rate
                allowHalf
                disabled
                defaultValue={vote_average ? vote_average / 2 : rating / 2}
                className={classes.MovieCardRate}
              />
            }
          />
        </Card>
      </Col>
    );
  }
}

export default withRouter(MovieCard);
