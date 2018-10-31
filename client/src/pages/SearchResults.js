import React, { Component } from 'react';

class SearchResults extends Component {
  render() {
    console.log(this.props.match.params.title);
    return (
      <div>
        <h1>Search Results</h1>
        <h3>{this.props.match.params.title}</h3>
      </div>
    );
  }
}

export default SearchResults;
