const handlers = require('../handlers')

module.exports = (app) => {
  // home route
  app.get('/', handlers.home)

  // view all memes route
  app.get('/viewAllBooks', handlers.viewAll)

  // meme routes
  app.get('/addBook', handlers.addBookView)
  app.post('/addBook', handlers.addBookForm)

  // get details route
  app.get('/books/details', handlers.getDetailsView)
}
