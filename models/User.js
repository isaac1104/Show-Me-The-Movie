const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  username: String,
  avatar: String,
  lastSignedIn: Number
});

mongoose.model('User', userSchema);
