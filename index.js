const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const helmet = require('helmet');
const {handleError} = require('./utils/error');

if (process.env.NODE_ENV !== 'production')
  require('dotenv').config();

// IMPORT MODELS
require('./models/Players');
require('./models/Users');
require('./models/Teams');

const app = express();

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_URI_TEST);

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

//IMPORT ROUTES
require('./routes/authRoutes')(app);
require('./routes/memberRoutes')(app);
// require('./routes/userRoutes')(app);
require('./routes/teamRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});

app.use((err, req, res, next) => {
  handleError(err, res, next);
});