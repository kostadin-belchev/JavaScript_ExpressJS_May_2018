const homePageHandler = require('./homepageHandler');
const staticContentHandler = require('./staticContentHandler');
const viewAllMoviesHandler = require('./viewAllHandler');
const addMovieHandler = require('./addMovieHandler');
const errorHandler = require('./errorHandler');

module.exports = [
  homePageHandler,
  staticContentHandler,
  viewAllMoviesHandler,
  addMovieHandler,
  errorHandler // KEEP THIS ONE LAST
];
