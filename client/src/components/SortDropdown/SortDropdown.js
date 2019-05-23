import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { sortMovieData } from '../../actions';
import classes from './SortDropdown.module.css';

const { Option } = Select;

class SortDropdown extends Component {
  render() {
    return (
      <Select
        className={classes.SortDropdown}
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
