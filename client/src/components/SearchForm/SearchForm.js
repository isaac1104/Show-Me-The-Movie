import React, { Component } from 'react';
import FormField from './FormField';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchMovieData } from '../../actions';

class Form extends Component {
  formSubmit = ({ title }) => {
    const { history } = this.props;
    history.push(`/search/${title}`);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.formSubmit)}>
        <Field
          name='title'
          component={FormField}
        />
      </form>
    );
  }
}

function validate(value) {
  const errors = {};
  if (!value.title) {
    errors.title = 'Movie title is required!'
  }
  return errors;
}

export default compose(withRouter, reduxForm({ validate, form: 'title' }), connect(null, { fetchMovieData }))(Form);
