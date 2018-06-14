const Meme = require('../models/MemeSchema')
const shortId = require('shortid')

module.exports = (req, res) => {
  let id = req.query.id
  let filename = shortId.generate()
  Meme.findById(id).then((meme) => {
    meme.filename = filename
    console.log(meme)
    res.render('details', meme)
  })
}
