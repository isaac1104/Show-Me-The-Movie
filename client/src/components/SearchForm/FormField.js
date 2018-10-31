import React from 'react';
import { Input } from 'antd';
const { Search } = Input;

const FormField = ({ input }) => {

  const handleFocus = event => {
    event.target.select();
  }

  return (
    <Search
      {...input}
      autoComplete='off'
      onFocus={handleFocus}
    />
  );
}

export default FormField;
