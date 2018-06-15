const mongoose = require('mongoose')
mongoose.Promise = global.Promise

module.exports = (config) => {
  mongoose.connect(config.connectionString)

  let db = mongoose.connection

  db.once('open', (err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Mongo connected successfully')
  })

  db.on('error', (err) => {
    console.log(err)
  })
}
