const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  id: Number,
  name: String,
  email: String,
  pictureUrl: String,
  teamSelected: Schema.Types.ObjectId
})

mongoose.model('users', userSchema);