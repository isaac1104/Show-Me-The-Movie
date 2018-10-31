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
      placeholder='Enter A Movie Title'
    />
  );
}

export default FormField;
