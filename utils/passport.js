const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const keys = require('../config/keys');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}, async (accesstoken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ googleId: profile.id });
  if (existingUser) {
    return done(null, existingUser);
  }
  const user = await new User({
    googleId: profile.id,
    username: profile.displayName,
    avatar: profile.photos[0].value || '',
    lastSignedIn: Date.now()
  }).save();
  done(null, user);
}));

passport.use(new FacebookStrategy({
  clientID: keys.facebookClientID,
  clientSecret: keys.facebookClientSecret,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos'],
  proxy: true
}, async (accesstoken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ facebookId: profile.id });
  if (existingUser) {
    return done(null, existingUser);
  }
  const user = await new User({
    facebookId: profile.id,
    username: profile.displayName,
    avatar: profile.photos[0].value || '',
    lastSignedIn: Date.now()
  }).save();
  done(null, user);
}));
