import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { sortMovieData } from '../actions';
const { Option } = Select;

class SortDropdown extends Component {
  render() {
    return (
      <Select
        style={{ width: 120 }}
        placeholder='Sort By'
        onChange={value => this.props.sortMovieData(value)}
      >
        <Option value='vote_average'>Rating</Option>
        <Option value='popularity'>Popularity</Option>
      </Select>
    );
  }
}

export default connect(null, { sortMovieData })(SortDropdown);
