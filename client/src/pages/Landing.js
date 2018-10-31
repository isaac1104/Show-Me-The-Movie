import React from 'react';
import GoogleButton from '../components/GoogleButton';

const styles = {
  container: {
    height: '90vh',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const Home = () => {
  return (
    <div style={styles.container}>
      <div>
        <h1>Welcome to SMTM</h1>
        <GoogleButton />
      </div>
    </div>
  );
};

export default Home;
