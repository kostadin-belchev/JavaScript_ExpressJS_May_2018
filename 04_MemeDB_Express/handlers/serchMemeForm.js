const Meme = require('../models/Meme')

module.exports = (req, res) => {
  let formData = req.body
  // console.log('formData:')
  // console.log(formData)
  let memeString = formData.memeTitle
  let genreString = formData.genre
  if (genreString === 'All Genres') {
    Meme.find({})
      .where('memeTitle').equals(memeString)
      .then((memes) => {
        res.render('viewAll', {memes})
      })
  } else {
    Meme.find({})
      .where('memeTitle').equals(memeString)
      .where('genre').equals(genreString).then((memes) => {
        res.render('viewAll', {memes})
      })
  }
}
