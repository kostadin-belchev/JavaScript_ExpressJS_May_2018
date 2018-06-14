const Meme = require('../models/Meme')
const url = require('url')
const qs = require('querystring')

module.exports = (req, res) => {
  let targetMemeId = qs.parse(url.parse(req.url).query).id
  // console.log(targetMemeId)
  Meme.findById(targetMemeId).then((targetMeme) => {
    // target meme is already an object so no need to pass it within {}
    res.render('getDetails', targetMeme)
  })
}
