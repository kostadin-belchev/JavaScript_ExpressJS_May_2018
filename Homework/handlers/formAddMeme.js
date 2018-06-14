const shortId = require('shortid')
const Meme = require('../models/MemeSchema')
const Genre = require('../models/GenreSchema')

module.exports = (req, res, next) => {
  let file = req.files.meme
  let fileName = shortId.generate()
  let memePath = `./public/fileStorage/${fileName}.jpg`
  file.mv(memePath, (err) => {
    if (err) {
      console.log(err)
    }

    let formData = req.body
    formData.memePath = memePath
    let currentGenre = formData.genre

    Genre.find({}).then((genres) => {
      Meme.create(formData).then(obj => {
        Genre.findOne({genreTitle: currentGenre}).then((foundGenre) => {
          foundGenre.memeList.push(obj._id)
          foundGenre.save().then(() => {
            res.render('addMeme', {
              status: true,
              genres
            })
          })
        })
      })
    })
  })
}
