const axios = require('axios');
const keys = require('../config/keys');
const requireAuth = require('../middlewares/requireAuth');

module.exports = app => {
  app.get('/api/now_playing_movies', requireAuth, async (req, res) => {
    try {
      const request = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${keys.tmdbApiKey}&language=en-US&page=1&region=us`);
      const { data } = request;
      res.send(data);
    } catch (e) {
      res.send(e);
    }
  });
};
