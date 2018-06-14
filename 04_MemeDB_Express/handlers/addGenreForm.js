const Genre = require('../models/Genre')

module.exports = (req, res) => {
  let formData = req.body
  console.log(formData)
  Genre.create(formData).then((addedGenre) => {
    res.render('addGenre', {
      status: true,
      addedGenre
    })
  })
}
