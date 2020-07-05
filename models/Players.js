const mongoose = require('mongoose');
const {Schema} = mongoose;

const playerSchema = new Schema({
  id: Number,
  name: String,
  team: Schema.Types.ObjectId,
  join_date: Date,
  leave_date: Date,
  kick_reason: String,
  attendance: [Date]
})

mongoose.model('players', playerSchema);