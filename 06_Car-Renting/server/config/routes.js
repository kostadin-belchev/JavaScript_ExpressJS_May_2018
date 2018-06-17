const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', auth.isAuthenticated, controllers.home.about)

  // add car, for admins only
  app.get('/cars/create', auth.isInRole('Admin'), controllers.cars.addCarGet)
  app.post('/cars/create', auth.isInRole('Admin'), controllers.cars.addCarPost)

  // see all available cars, for all users, including anonymous users
  app.get('/cars/all', controllers.cars.seeAllGet)

  // rent a car, available for all registered users
  app.get('/cars/rent', auth.isAuthenticated, controllers.cars.rentGet)
  app.post('/cars/rent', auth.isAuthenticated, controllers.cars.rentPost)

  // edit a car, for admins only
  app.get('/cars/edit', auth.isInRole('Admin'), controllers.cars.editGet)
  app.post('/cars/edit', auth.isInRole('Admin'), controllers.cars.editPost)

  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.post('/users/logout', controllers.users.logout)

  app.get('/users/profile/me', auth.isAuthenticated, controllers.users.getHistory)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
