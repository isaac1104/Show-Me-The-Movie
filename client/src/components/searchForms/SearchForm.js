import React, { Component } from 'react';
import FormField from './FormField';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { searchForMovies } from '../../actions';

class SearchForm extends Component {
  formSubmit = ({ title }) => {
    this.props.history.push(`/search/${title}/1`);
  };

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
};

function validate(value) {
  const errors = {};
  if (!value.title) {
    errors.title = 'Movie title is required!'
  }
  return errors;
};

export default compose(withRouter, reduxForm({ validate, form: 'title' }), connect(null, { searchForMovies }))(SearchForm);
