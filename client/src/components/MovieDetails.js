import React from 'react';

const MovieDetails = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h3>{props.release_date}</h3>
    </div>
  );
}

export default MovieDetails;
