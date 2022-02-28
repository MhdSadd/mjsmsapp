const defaultRoutes = require('../routes/default.routes')
const adminRoutes = require('../routes/admin.routes')
const authRoutes = require('../routes/auth.routes')


const routers = (app) => {
  app.use('/', defaultRoutes)
  app.use('/admin', adminRoutes)
  app.use('/auth', authRoutes)
};

module.exports = routers;
