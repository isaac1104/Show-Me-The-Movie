import React from 'react';
import { Icon, Spin } from 'antd';
import classes from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={classes.SpinnerContainer}>
      <Spin indicator={
        <Icon
          type='loading'
          className={classes.SpinnerIcon}
        />
      }
      />
    </div>
  );
}

export default Spinner;
