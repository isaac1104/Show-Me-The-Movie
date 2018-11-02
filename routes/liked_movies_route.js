const mongoose = require('mongoose');
const LikedMovies = mongoose.model('LikedMovies');

module.exports = app => {
  app.get('/api/liked_movies', async (req, res) => {
    const likedMovies = await LikedMovies.find({ _user: req.user.id });
    res.send(likedMovies);
  });

  app.post('/api/liked_movies', async (req, res) => {
    console.log(req.body);
    const { title, movieId } = req.body;
    const likedMovies = new LikedMovies({
      movieId,
      title,
      _user: req.user.id
    });
    try {
      await likedMovies.save();
    } catch (e) {
      res.status(400).send(e);
    }
  });
};
