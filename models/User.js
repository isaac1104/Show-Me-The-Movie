const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  username: String,
  avatar: String
});

mongoose.model('User', userSchema);
