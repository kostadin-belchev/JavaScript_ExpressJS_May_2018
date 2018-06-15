const Book = require('../models/Book')

module.exports = (req, res) => {
  Book.find({}).then((books) => {
    // console.log(books)
    res.render('viewAll', {books})
  })
}
