import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { sortMovieData } from '../actions';
const { Option } = Select;

class SortDropdown extends Component {
  render() {
    const styles = {
      select: {
        width: 120
      }
    };

    return (
      <Select
        style={styles.select}
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
