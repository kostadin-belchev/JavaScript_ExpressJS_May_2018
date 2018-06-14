// Prepare the middleware functions.

const path = require('path')
const express = require('express')

module.exports = (app, config) => {
  // Handle views
  app.set('view engine', 'pug')
  app.set('views', path.normalize(path.join(config.rootPath, '../views')))

  // Handle static files
  app.use('/public', express.static(path.join(config.rootPath, '../public')))
}
