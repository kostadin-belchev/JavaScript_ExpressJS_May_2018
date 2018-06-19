const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/latest-article', controllers.home.lastArticle)

  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.post('/users/logout', controllers.users.logout)

  // create article, for authenticated users
  app.get('/create-article', auth.isAuthenticated, controllers.articles.createGet)
  app.post('/create-article', auth.isAuthenticated, controllers.articles.createPost)

  // all articles, all users
  app.get('/all-articles', controllers.articles.seeAll)

  // details, all users
  app.get('/getDetails', controllers.articles.detailsGet)

  // edit article, for authenticated users only
  app.get('/articles/edit', auth.isAuthenticated, controllers.articles.editGet)
  app.post('/articles/edit', auth.isAuthenticated, controllers.articles.editPost)

  // lock unlock, only for Admins
  app.get('/acrticles/lock', auth.isInRole('Admin'), controllers.articles.lock)
  app.get('/acrticles/unlock', auth.isInRole('Admin'), controllers.articles.unlock)

  // history, auth users only
  app.get('/articles/history', auth.isAuthenticated, controllers.articles.historyGet)

  // history details, for auth users only
  app.get('/getHistory', auth.isAuthenticated, controllers.articles.historyGetDetails)

  // search
  app.post('/search', controllers.articles.search)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found! This web page does not exist in our website. Please go back. :)')
    res.end()
  })
}
