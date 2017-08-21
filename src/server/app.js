const express = require('express');
const configServer = require('./config/express-server');
const { setupDb } = require('./config/database');
const configRoutes = require('./routes');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

const db = setupDb();
configServer(app);
configRoutes(app);
db.on('error', console.error.bind(console, 'Connection Error : '));
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT} ...`);
  });
});

module.exports = app;
