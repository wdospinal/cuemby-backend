const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const mongoose = require('mongoose');
// Database Connection
function setupDb() {
  mongoose.Promise = global.Promise;
  const env = process.env.NODE_ENV;
  const dbConnectionString = (env === 'testing')
    ? 'mongodb://admin:123@ds027618.mlab.com:27618/cuemby'
    : 'mongodb://admin:123@ds027618.mlab.com:27618/cuemby';

  mongoose.connect(dbConnectionString);
  return mongoose.connection;
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://letflix-67e8f.firebaseio.com',
});

const database = admin.database();
module.exports = {
  database,
  setupDb,
};
