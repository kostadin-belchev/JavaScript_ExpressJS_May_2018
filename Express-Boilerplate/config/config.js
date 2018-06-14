const path = require('path')

module.exports = {
  development: {
    connectionString: 'mongodb://localhost:27017/music',
    rootPath: path.normalize(path.join(__dirname, './'))
  }
}
