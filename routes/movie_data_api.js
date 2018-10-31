const axios = require('axios');
const keys = require('../config/keys');

module.exports = app => {
  app.get('/api/movie_data', async (req, res) => {
    try {
      const request = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${keys.tmdbApiKey}&language=en-US&query=${req.query.title}&page=1&include_adult=false`);
      const { data } = request;
      res.send(data);
    } catch (e) {
      res.send(e);
    }
  });
};
