import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Col, Rate } from 'antd';
import { SimpleImg, SimpleImgProvider } from 'react-simple-img';
const { Meta } = Card;

class MovieCard extends Component {
  render() {
    const styles = {
      col: {
        marginTop: '15px',
        marginBottom: '15px',
        width: this.props.width || null
      },
      card: {
        width: '90%',
        height: '100%',
        margin: 'auto'
      },
      rate: {
        fontSize: '12px',
        marginTop: '10px'
      }
    };

    return (
      <Col xs={24} sm={12} md={6} lg={6} xl={4} xxl={3} style={styles.col}>
        <Card
          hoverable
          cover={
            <SimpleImgProvider>
              <SimpleImg
                width={180}
                height={240}
                src={this.props.poster ? `http://image.tmdb.org/t/p/w185/${this.props.poster}` : 'https://via.placeholder.com/300?text=Poster+Not+Available' }
                alt='poster'
              />
            </SimpleImgProvider>
          }
          onClick={() => this.props.history.push(`/movie/${this.props.id}`)}
          style={styles.card}
          >
            <Meta
              title={this.props.title}
              description={this.props.release_date}
            />
            <Meta
              description={<Rate allowHalf disabled defaultValue={this.props.rating / 2} style={styles.rate} />}
            />
          </Card>
        </Col>
    );
  }
}

export default withRouter(MovieCard);
