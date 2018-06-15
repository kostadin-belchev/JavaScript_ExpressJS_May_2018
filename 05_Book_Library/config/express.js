// Prepare the middleware functions and view engine
const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const fileUploader = require('express-fileupload')
const bodyParser = require('body-parser')

module.exports = (app, config) => {
  // Handlebars set up
  app.engine('hbs', handlebars({
    extname: '.hbs',
    partialDir: ('views/partials')
  }))

  app.set('view engine', '.hbs')

  // Handle static files
  app.use('/static', express.static(path.join(config.rootPath, '../static')))

  // File uploader middlewear setup
  app.use(fileUploader())

  app.use(bodyParser.urlencoded({
    extended: false
  }))
}
