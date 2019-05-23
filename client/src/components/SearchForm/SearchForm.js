import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { searchForMovies } from '../../actions';
import { Input } from 'antd';
const { Search } = Input;

class SearchForm extends Component {
  formSubmit = ({ title }) => {
    this.props.history.push(`/search/${title}/1`);
  };

  renderInput({ input }) {
    return (
      <Search
        {...input}
        autoComplete='off'
        placeholder='Enter A Movie Title'
        onFocus={event => event.target.select()}
      />
    )
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.formSubmit)}>
        <Field
          name='title'
          component={this.renderInput}
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
