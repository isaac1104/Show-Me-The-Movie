const axios = require('axios');
const keys = require('../config/keys');

module.exports = app => {
  app.get('/api/trending_movies', async (req, res) => {
    const request = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${keys.tmdbApiKey}`);
    const { data: { results } } = request;
    res.status(200).send(results);
  });
};
