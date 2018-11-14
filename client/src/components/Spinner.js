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
        <Spin size='large' indicator={ <Icon type='loading' /> } />
      </Fragment>
    </div>
  );
}

export default Spinner;
