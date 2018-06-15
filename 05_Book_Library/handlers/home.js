const Book = require('../models/Book')

module.exports = (req, res) => {
  Book.find({}).then((allBooks) => {
    let booksCount = allBooks.length
    res.render('home', {booksCount})
  })
}
