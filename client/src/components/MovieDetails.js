import React from 'react';
import { Card, Col } from 'antd';
const { Meta } = Card;

const styles = {
  card: {
    width: '80%',
    height: '100%',
    margin: 'auto'
  },
  poster: {
    margin: 'auto'
  }
};

const MovieDetails = props => {
  return (
    <Col xs={24} sm={12} md={6} lg={4} xl={4} style={{ marginTop: '15px', marginBottom: '15px' }}>
      <Card
        hoverable
        cover={
          <img
            src={props.poster ? `http://image.tmdb.org/t/p/w185/${props.poster}` : 'https://via.placeholder.com/300?text=Poster+Not+Available' }
            alt='movie poster'
            style={styles.poster}
          />
        }
        style={styles.card}
        >
          <Meta
            title={props.title}
            description={props.release_date}
          />
        </Card>
    </Col>
  );
}

export default MovieDetails;
