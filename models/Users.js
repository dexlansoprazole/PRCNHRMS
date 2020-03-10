const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  id: Number,
  name: String,
  email: String,
})

mongoose.model('users', userSchema);