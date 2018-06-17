const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '/../../'))

const databaseName = 'wiki'

module.exports = {
  development: {
    rootPath: rootPath,
    db: `mongodb://localhost:27017/${databaseName}`,
    port: 1449
  },
  staging: {
  },
  production: {
    port: process.env.PORT
  }
}
