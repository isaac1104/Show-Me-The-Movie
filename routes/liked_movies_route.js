const mongoose = require('mongoose');
const LikedMovies = mongoose.model('LikedMovies');
const requireAuth = require('../middlewares/requireAuth');

module.exports = app => {
  app.get('/api/liked_movies', requireAuth, async (req, res) => {
    const likedMovies = await LikedMovies.find({ _user: req.user.id });
    res.send(likedMovies);
  });

  app.post('/api/liked_movies', requireAuth, async (req, res, done) => {
    const { title, movieId, rating, poster, releaseDate } = req.body;
    const currentMovie = await LikedMovies.findOne({ movieId });
    if (currentMovie) {
      return done(null, currentMovie);
    }
    const likedMovies = new LikedMovies({
      movieId,
      title,
      rating,
      poster,
      releaseDate,
      _user: req.user.id
    });
    try {
      await likedMovies.save();
    } catch (e) {
      res.status(400).send(e);
    }
  });

  app.delete('/api/liked_movies', requireAuth, async (req, res) => {
    const { movieId } = req.query;
    try {
      const removeLikedMovie = await LikedMovies.deleteOne({ movieId });
    } catch (e) {
      res.status(422).send(e);
    }
  });
};
