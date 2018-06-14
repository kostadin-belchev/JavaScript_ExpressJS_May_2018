const homeHandler = require('./home')
const addMemeHandler = require('./addMeme')
const viewAllHandler = require('./viewAll')
const searchHandler = require('./searchMeme')
const genreHandler = require('./addGenre')
const formAddMemeHandler = require('./formAddMeme')
const addGenreHandler = require('./addGenreToDb')
const detailsHandler = require('./details')
const findMemesHandler = require('./findMemes')

module.exports = {
  home: homeHandler,
  addMeme: addMemeHandler,
  viewAll: viewAllHandler,
  search: searchHandler,
  genre: genreHandler,
  formAddMeme: formAddMemeHandler,
  addGenre: addGenreHandler,
  details: detailsHandler,
  findMemes: findMemesHandler
}
