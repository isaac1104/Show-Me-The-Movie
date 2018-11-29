import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    };

    componentDidUpdate() {
      this.shouldNavigateAway();
    };

    shouldNavigateAway() {
      const { data } = this.props.current_user;
      if (data === '') {
        return;
      }

      if (!data) {
        this.props.history.push('/');
      }
    };

    render() {
      return <ChildComponent {...this.props} />;
    }
  };

  function mapStateToProps({ current_user }) {
    return { current_user };
  };

  return withRouter(connect(mapStateToProps, null)(ComposedComponent));
};
