const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '/../../'))

const databaseName = 'wiki2'

module.exports = {
  development: {
    rootPath: rootPath,
    db: `mongodb://localhost:27017/${databaseName}`,
    port: 1473
  },
  staging: {
  },
  production: {
    port: process.env.PORT
  }
}
