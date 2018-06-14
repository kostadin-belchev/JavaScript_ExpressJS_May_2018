let Meme = require('../models/MemeSchema')
module.exports = (req, res) => {
  Meme.find({}).then((memes) => {
    res.render('viewAll', {memes})
  })
}
