import React from 'react';
import GoogleButton from '../components/GoogleButton';
import FacebookButton from '../components/FacebookButton';
import moviesImage from '../images/movies.jpg';

const styles = {
  container: {
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  text: {
    color: '#ffffff',
    marginBottom: '20px'
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
  }
};

const Home = () => {
  return (
    <div style={styles.container} className='landing'>
      <div style={styles.poster}/>
      <div style={styles.textContainer}>
        <h1 style={styles.text}><span role='img' aria-label='popcorn'>🍿</span> Show Me The Movie</h1>
        <h3 style={styles.text}>Whether You Are Looking For Your Favorite Old Movies, Or In A Mood To Discover Something New, We Have It All</h3>
        <GoogleButton />
        <FacebookButton />
      </div>
    </div>
  );
};

export default Home;
