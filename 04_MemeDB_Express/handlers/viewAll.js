const Meme = require('../models/Meme')

module.exports = (req, res) => {
  Meme.find({}).then((memes) => {
    // console.log(memes)
    res.render('viewAll', {memes})
  })
}
