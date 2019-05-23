import React from 'react';
import { withRouter } from 'react-router-dom';
import { Pagination } from 'antd';
import classes from './MoviePagination.module.css';

const MoviePagination = ({ data, title, page, history }) => {
  if (!data) {
    return null;
  }
  return (
    <Pagination
      defaultPageSize={20}
      current={parseInt(page, 10)}
      hideOnSinglePage
      total={data.total_results}
      onChange={page => history.push(`/search/${title}/${page}`)}
      className={classes.MoviePagination}
    />
  );
};

export default withRouter(MoviePagination);
