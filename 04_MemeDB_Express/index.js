const express = require('express')
const port = process.env.PORT || 7000
const config = require('./config/config')
const dataBase = require('./config/dbConfig')

const app = express()
// Establish DataBase connection
dataBase(config.development)

require('./config/express')(app, config.development)
// handling routes
require('./config/routes')(app)

app.listen(port, () => console.log(`Server listening on port ${port}...`))
