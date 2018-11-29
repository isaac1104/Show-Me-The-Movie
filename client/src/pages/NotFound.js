import React from 'react';

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
      <h1 style={styles.text}>Page Not Found!</h1>
    </div>
  )
};

export default NotFound;
