import React from 'react';
import GoogleButton from '../components/GoogleButton';
import moviesImage from '../images/movies.jpg';
import { SimpleImg, SimpleImgProvider } from 'react-simple-img';

const styles = {
  container: {
    height: '90vh',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundImage: `url(${moviesImage})`
  }
};

const Home = () => {
  return (
    <SimpleImgProvider>
      <div style={styles.container}>
        <div>
          <h1>Show Me The Movie</h1>
          <h3>Whether You Are Looking For Your Favorite Old Movies, Or In A Mood To Watch Something New You Haven't Watched, We Have It All</h3>
          <GoogleButton />
        </div>
      </div>
    </SimpleImgProvider>
  );
};

export default Home;
