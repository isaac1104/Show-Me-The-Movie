import React from 'react';
import { withRouter } from 'react-router-dom';
import { Pagination } from 'antd';

const MoviePagination = ({ data, title, page, history }) => {
  if (!data) return null;
  const styles = {
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '15px'
    }
  };

  return (
    <Pagination
      defaultPageSize={20}
      current={parseInt(page, 10)}
      hideOnSinglePage
      total={data.total_results}
      onChange={page => history.push(`/search/${title}/${page}`)}
      style={styles.pagination}
    />
  );
};

export default withRouter(MoviePagination);
