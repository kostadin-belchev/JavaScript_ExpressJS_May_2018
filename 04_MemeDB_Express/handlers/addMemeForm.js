const shortId = require('shortid')
const Meme = require('../models/Meme')
const Genre = require('../models/Genre')

module.exports = (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.')
  }
  let formData = req.body
  // The name of the input field (i.e. "meme") is used to retrieve the uploaded file
  let memeFile = req.files.meme
  // console.log('memeFile:')
  // console.log(memeFile)
  // console.log('formData:')
  // console.log(formData)
  // generate a random filename using shortid
  let filename = shortId.generate()
  let memePath = `./public/fileStorage/${filename}.jpg`
  // We use the mv() method to place the file somewhere our your server
  memeFile.mv(memePath, function (err) {
    if (err) {
      return res.status(500).send(err)
    }
    // assigning it one more property so we can use the whole formData as the meme to add to the database
    formData.memePath = memePath
    let memeToAdd = formData
    let currentGenre = formData.genre

    Genre.find({}).then((genres) => {
      Meme.create(memeToAdd).then((objMemeAdded) => {
        Genre.findOne({ genreTitle: currentGenre }).then((foundGenre) => {
          foundGenre.memeList.push(objMemeAdded._id)
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
