import React from 'react';
import { Icon, Spin } from 'antd';

const Spinner = () => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
      width: '100%'
    },
    icon: {
      fontSize: '3em'
    }
  };

  return (
    <div style={styles.container}>
      <Spin indicator={
        <Icon
          type='loading'
          style={styles.icon}
        />
      }
      />
    </div>
  );
}

export default Spinner;
