const Genre = require('../models/GenreSchema')

module.exports = (req, res) => {
  let myGenre = req.body

  Genre.create(myGenre).then(obj => {
    res.render('addGenre', {
      status: true
    })
  })
}
