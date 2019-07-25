require('dotenv').config();
const mongoose = require('mongoose');
require('./lib/utils/connect')();
require('./test/seed-data')()
  .then(() => console.log('done seeding db'))
  .finally(() => mongoose.connection.close());



