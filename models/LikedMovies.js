const mongoose = require('mongoose');
const { Schema } = mongoose;

const likedMoviesSchema = new Schema({
  title: String,
  movieId: Number,
  rating: Number,
  poster: String,
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('LikedMovies', likedMoviesSchema);
