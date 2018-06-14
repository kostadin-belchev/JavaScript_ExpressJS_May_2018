const handlers = require('../handlers')

module.exports = (app) => {
  app.get('/', handlers.home)

  app.get('/addMeme', handlers.addMeme)
  app.post('/addMeme', handlers.formAddMeme)

  app.get('/viewAllMemes', handlers.viewAll)

  app.get('/searchMeme', handlers.search)
  app.post('/searchMeme', handlers.findMemes)

  app.get('/addGenre', handlers.genre)
  app.post('/addGenre', handlers.addGenre)

  app.get('/getDetails', handlers.details)
}
