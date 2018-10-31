import React, { Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Col } from 'antd';
const { Meta } = Card;

class MovieCard extends Component {
  render() {
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

    return (
      <Col xs={24} sm={12} md={6} lg={4} xl={4} style={{ marginTop: '15px', marginBottom: '15px' }}>
        <Card
          hoverable
          cover={
            <img
              src={this.props.poster ? `http://image.tmdb.org/t/p/w185/${this.props.poster}` : 'https://via.placeholder.com/300?text=Poster+Not+Available' }
              alt='movie poster'
              style={styles.poster}
            />
          }
          onClick={() => this.props.history.push(`/movie/${this.props.id}`)}
          style={styles.card}
          >
            <Meta
              title={this.props.title}
              description={this.props.release_date}
            />
          </Card>
        </Col>
    );
  }
}

export default withRouter(MovieCard);
