const homeHandler = require('./home');
const filesHandler = require('./static-files');
const addProductHandler = require('./product');

module.exports = [
  filesHandler,
  homeHandler,
  addProductHandler
];
