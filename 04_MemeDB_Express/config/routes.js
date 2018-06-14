const handlers = require('../handlers')

module.exports = (app) => {
  // home route
  app.get('/', handlers.home)

  // view all memes route
  app.get('/viewAllMemes', handlers.viewAll)

  // meme routes
  app.get('/addMeme', handlers.addMemeView)
  app.post('/addMeme', handlers.addMemeForm)

  // genre routes
  app.get('/addGenre', handlers.addGenreView)
  app.post('/addGenre', handlers.addGenreForm)

  // get details route
  app.get('/getDetails', handlers.getDetailsView)

  // search route
  app.get('/searchMeme', handlers.searchMemeView)
  app.post('/searchMeme', handlers.serchMemeForm)
}
