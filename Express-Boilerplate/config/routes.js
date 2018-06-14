const handlers = require('../handlers')

module.exports = (app) => {
  app.get('/', handlers.home.index)
  app.get('/about', handlers.about.about)
}
