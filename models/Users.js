const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  id: Number,
  name: String,
  email: String
})

mongoose.model('users', userSchema);