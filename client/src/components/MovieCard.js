import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Col, Rate } from 'antd';
import { SimpleImg } from 'react-simple-img';
const { Meta } = Card;

class MovieCard extends Component {
  render() {
    const styles = {
      col: {
        marginTop: '15px',
        marginBottom: '15px',
        width: this.props.colWidth
      },
      card: {
        width: this.props.cardWidth,
        height: '100%',
        margin: 'auto'
      },
      rate: {
        fontSize: '12px',
        marginTop: '10px'
      }
    };

    const { title, release_date, releaseDate, poster, poster_path, vote_average, rating, movieId, id } = this.props.movie;
    return (
      <Col xs={24} sm={12} md={6} lg={6} xl={4} xxl={3} style={styles.col}>
        <Card
          hoverable
          cover={
            <SimpleImg
              width={180}
              height={240}
              src={
                poster
                ? `https://image.tmdb.org/t/p/w185/${poster}`
                  : poster_path
                  ? `https://image.tmdb.org/t/p/w185/${poster_path}`
                  : 'https://via.placeholder.com/300/f0f2f5/000000?text=Poster+Not+Available'
              }
              alt={title}
            />
          }
          onClick={() => this.props.history.push(`/movie/${movieId ? movieId : id }`)}
          style={styles.card}
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
                style={styles.rate}
              />
            }
          />
        </Card>
      </Col>
    );
  }
}

MovieCard.defaultProp = {
  colWidth: null,
  cardWidth: '100%',
  id: null,
  movieId: null,
  title: '',
  release_date: '',
  releaseDate: '',
  vote_average: 0,
  rating: 0
};

export default withRouter(MovieCard);
