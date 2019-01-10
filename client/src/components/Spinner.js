import React, { Fragment } from 'react';
import { Icon, Spin } from 'antd';

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
      <Fragment>
        <div id='loader' />
      </Fragment>
    </div>
  );
}

export default Spinner;
