const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

require('./models/User');
require('./models/LikedMovies');
require('./utils/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongodbURI);

app.use(express.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth')(app);
require('./routes/test_route')(app);
require('./routes/movie_data_api')(app);
require('./routes/liked_movies_route')(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

if (['production', 'ci'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
