const showsRouter = require('./api/shows');
const userRouter = require('./api/users');
const authRouter = require('./api/auth');

function setRoutes(app) {
  app.use('/api/shows/', showsRouter);
  app.use('/api/users/', userRouter);
  app.use('/api/auth/', authRouter);
}

module.exports = setRoutes;
