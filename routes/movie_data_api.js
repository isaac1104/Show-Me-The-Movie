const axios = require('axios');
const keys = require('../config/keys');
const requireAuth = require('../middlewares/requireAuth');

module.exports = app => {
  app.get('/api/movie_search', requireAuth, async (req, res) => {
    try {
      const request = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${keys.tmdbApiKey}&language=en-US&query=${req.query.title}&page=${req.query.page}&include_adult=false`);
      const { data } = request;
      res.status(200).send(data);
    } catch (e) {
      res.status(404).send(e);
    }
  });

  app.get('/api/movie_data', requireAuth, async (req, res) => {
    try {
      const request = await axios.get(`https://api.themoviedb.org/3/movie/${req.query.id}?api_key=${keys.tmdbApiKey}&language=en-US`);
      const { data } = request;
      res.status(200).send(data);
    } catch (e) {
      res.status(404).send(e);
    }
  });
};
