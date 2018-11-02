const axios = require('axios');
const keys = require('../config/keys');
const requireAuth = require('../middlewares/requireAuth');

module.exports = app => {
  app.get('/api/recommended_movies', requireAuth, async (req, res) => {
    try {
      const request = await axios.get(`https://api.themoviedb.org/3/movie/${req.query.id}/recommendations?api_key=${keys.tmdbApiKey}&language=en-US&page=1`);
      const { data } = request;
      res.send(data);
    } catch (e) {
      res.send(e);
    }
  });
};
