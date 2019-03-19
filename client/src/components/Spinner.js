import React from 'react';

const Spinner = () => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
      width: '100%'
    }
  };

  return (
    <div style={styles.container}>
      <div className='loader' />
    </div>
  );
}

export default Spinner;
