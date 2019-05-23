import React from 'react';
import { Steps, Icon, Row, Col, Typography } from 'antd';
import SignInButton from '../SignInButton';
import moviesImage from '../../images/movies.jpg';
import classes from './Landing.module.css';
const { Title } = Typography;
const { Step } = Steps;

const styles = {
  poster: {
    backgroundImage: `url(${moviesImage})`
  }
};

const Home = () => {
  return (
    <div className={classes.LandingContainer}>
      <div className={classes.LandingPoster} style={styles.poster} />
      <div className={classes.LandingTextContainer}>
        <Title level={2} className={classes.LandingText}><span role='img' aria-label='popcorn'>🍿</span> Show Me The Movie</Title>
        <Typography className={classes.LandingText}>Whether You Are Looking For Your Favorite Old Movies, Or In A Mood To Discover Something New, We Have It All</Typography>
        <Row>
          <Col xs={9} sm={9} md={24} lg={24} xl={24}>
            <Steps size='small'>
              <Step status='finish' title='Login' icon={<Icon type='user' />} />
              <Step status='finish' title='Search' icon={<Icon type='search' style={{ color: '#00aca4' }} />} />
              <Step status='finish' title='Like' icon={<Icon type='heart' style={{ color: '#d44700' }} />} />
            </Steps>
          </Col>
          <Col xs={12} sm={12} md={24} lg={24} xl={24}>
            <div className={classes.LandingButtonsContainer}>
              <SignInButton platforms={[ 'Google', 'Facebook' ]} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
