const Book = require('../models/Book')

module.exports = (req, res) => {
  let formData = req.body
  // console.log('formData:')
  // console.log(formData)
  Book.create(formData).then(() => {
    res.render('addBook', {
      status: true
    })
  })
}
