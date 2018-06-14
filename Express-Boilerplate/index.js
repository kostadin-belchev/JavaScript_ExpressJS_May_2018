const express = require('express')
const port = process.env.PORT || 3000
let app = express()
let config = require('./config/config')
let dataBase = require('./config/database-config')

// Establish DataBase connection
dataBase(config.development)

require('./config/express')(app, config.development)
require('./config/routes')(app)

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
