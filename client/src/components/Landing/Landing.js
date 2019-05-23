import React from 'react';
import { Steps, Icon, Row, Col, Typography } from 'antd';
import SignInButton from '../SignInButton';
import moviesImage from '../../images/movies.jpg';
const { Title } = Typography;
const { Step } = Steps;

const styles = {
  container: {
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#ffffff',
    marginBottom: '20px',
    textAlign: 'center'
  },
  textContainer: {
    zIndex: 1
  },
  poster: {
    position: 'absolute',
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${moviesImage})`,
    filter: 'blur(3px) brightness(0.3)'
  },
  buttonsContainer: {
    textAlign: 'center',
    marginTop: '1em'
  }
};

const Home = () => {
  return (
    <div style={styles.container} className='landing'>
      <div style={styles.poster}/>
      <div style={styles.textContainer}>
        <Title level={2} style={styles.text}><span role='img' aria-label='popcorn'>🍿</span> Show Me The Movie</Title>
        <Typography style={styles.text}>Whether You Are Looking For Your Favorite Old Movies, Or In A Mood To Discover Something New, We Have It All</Typography>
        <Row>
          <Col xs={9} sm={9} md={24} lg={24} xl={24}>
            <Steps size='small'>
              <Step status='finish' title='Login' icon={<Icon type='user' />} />
              <Step status='finish' title='Search' icon={<Icon type='search' style={{ color: '#00aca4' }} />} />
              <Step status='finish' title='Like' icon={<Icon type='heart' style={{ color: '#d44700' }} />} />
            </Steps>
          </Col>
          <Col xs={12} sm={12} md={24} lg={24} xl={24}>
            <div style={styles.buttonsContainer}>
              <SignInButton platforms={[ 'Google', 'Facebook' ]} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
