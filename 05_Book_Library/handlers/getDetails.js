const Book = require('../models/Book')
const url = require('url')
const qs = require('querystring')

module.exports = (req, res) => {
  let targetBookId = qs.parse(url.parse(req.url).query).id
  console.log(targetBookId)
  Book.findById(targetBookId).then((targetBook) => {
    // target book is already an object so no need to pass it within {}
    res.render('getDetails', targetBook)
  })
}
