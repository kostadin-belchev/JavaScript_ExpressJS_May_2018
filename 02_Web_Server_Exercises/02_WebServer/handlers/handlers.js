const homePageHandler = require('./homepageHandler')
const staticContentHandler = require('./staticContentHandler')
const viewAllMoviesHandler = require('./viewAllHandler')
const addMovieHandler = require('./addMovieHandler')
const errorHandler = require('./errorHandler')
const detailsHandler = require('./detailsPageHandler')

module.exports = [
  homePageHandler,
  staticContentHandler,
  viewAllMoviesHandler,
  addMovieHandler,
  detailsHandler,
  errorHandler // KEEP THIS ONE LAST
]
