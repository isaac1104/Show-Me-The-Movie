import React from 'react';
import SearchForm from '../components/SearchForm/SearchForm';

const styles = {
  text: {
    marginTop: '15px',
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center'
  }
};

const NotFound = () => {
  return (
    <div>
      <SearchForm />
      <h1 style={styles.text}>Movie Not Found!</h1>
    </div>
  )
};

export default NotFound;
