let Meme = require('../models/MemeSchema')

module.exports = (req, res) => {
  let formData = req.body
  Meme.find({}).where('memeTitle').equals(`${formData.memeTitle}`)
    .where('genre').equals(`${formData.genreSelect}`)
    .then((memes) => {
      res.render('viewAll', {memes})
    })
}
