const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  id: Number,
  name: String,
  email: String,
  pictureUrl: String,
  requests: [Schema.Types.ObjectId]
})

mongoose.model('users', userSchema);