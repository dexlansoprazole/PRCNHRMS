const mongoose = require('mongoose');
const {Schema} = mongoose;

const playerSchema = new Schema({
  id: Number,
  name: String,
  team: Schema.Types.ObjectId,  //TODO: remove
  join_date: Date,
  leave_date: Date,
  kick_reason: String
})

mongoose.model('players', playerSchema);