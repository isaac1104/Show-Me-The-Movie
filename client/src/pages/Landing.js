import React from 'react';
import GoogleButton from '../components/GoogleButton';

const styles = {
  container: {
    height: '90vh',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
};

const Home = () => {
  return (
    <div style={styles.container}>
      <div>
        <h1>Show Me The Movie</h1>
        <h3>Search For Your Favorite Old Movies, or Discover Something New You Haven't Watched</h3>
        <GoogleButton />
      </div>
    </div>
  );
};

export default Home;
