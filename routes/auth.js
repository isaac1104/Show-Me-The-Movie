const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = app => {
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  app.get('/auth/google/callback', passport.authenticate('google'), async (req, res) => {
    await User.updateOne({ _id: req.user.id }, { lastSignedIn: Date.now() });
    res.redirect('/home');
  });
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook'), async (req, res) => {
    await User.updateOne({ _id: req.user.id }, { lastSignedIn: Date.now() });
    res.redirect('/home');
  });
  app.get('/api/current_user', (req, res) => {
    res.status(200).send(req.user);
  });
  app.get('/api/signout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
