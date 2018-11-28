import React from 'react';
import { Icon, Rate } from 'antd';

const LikeIcon = ({ likedMovies, movieData, deleteLikedMovie, saveLikedMovie }) => {
  const savedMovie = likedMovies.find(movie => movie.movieId === parseInt(movieData.id, 10));
  if (savedMovie !== undefined) {
    return (
      <Rate
        character={<Icon type='heart' theme='filled' />}
        defaultValue={1}
        count={1}
        style={{ color: 'red' }}
        onChange={() => deleteLikedMovie(movieData.id)}
      />
    );
  }

  return (
    <Rate
      character={<Icon type='heart' theme='filled' />}
      defaultValue={0}
      count={1}
      style={{ color: 'red' }}
      onChange={() => saveLikedMovie({
        title: movieData.title,
        movieId: movieData.id,
        rating: movieData.vote_average,
        poster: movieData.poster_path,
        releaseDate: movieData.release_date
      })}
    />
  );
}

export default LikeIcon;
