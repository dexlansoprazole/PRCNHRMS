const mongoose = require('mongoose');
const {Schema} = mongoose;

const teamSchema = new Schema({
  name: String,
  leader: Schema.Types.ObjectId,
  managers: [Schema.Types.ObjectId],
  members: [Schema.Types.ObjectId],
  requests: [Schema.Types.ObjectId]
})

mongoose.model('teams', teamSchema);