const path = require('path')

const databaseName = 'memes-app'

module.exports = {
  development: {
    connectionString: `mongodb://localhost:27017/${databaseName}`,
    rootPath: path.normalize(path.join(__dirname, './'))
  }
}
