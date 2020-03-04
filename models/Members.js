const mongoose = require('mongoose');
const {Schema} = mongoose;

const memberSchema = new Schema({
  id: Number,
  name: String,
  join_date: Date,
  leave_date: Date,
  kick_reason: String
})

mongoose.model('members', memberSchema);