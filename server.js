const express = require('express');
const passport = require('passport');
const keys = require('./config/keys');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

require('./models/User');
require('/utils/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

app.use(express.json());
app.use(passport.initialize());
app.user(passport.session());

if (['production', 'ci'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

require('./routes/auth')(app);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
});
