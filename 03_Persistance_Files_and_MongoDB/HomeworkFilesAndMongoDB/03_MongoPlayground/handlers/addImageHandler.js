const Image = require('./../models/ImageSchema')
const formidable = require('formidable')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res)
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res)
  } else {
    return true
  }
}

function deleteImg(req, res) {
  // console.log(req.pathquery)
  Image.findByIdAndRemove(req.pathquery.id).then((removedImage) => {
    console.log(`Removed ${removedImage.description}.`)
    res.writeHead(302, {
      location: '/search'
    })
    res.end()
  }).catch(err => {
    throw err
  })
}

function addImage(req, res) {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err
    }
    const uniqueTags = fields.tagsId.split(',').reduce((prev, curr, index, array) => {
      if (prev.includes(curr) || curr.length === 0) {
        return prev
      } else {
        prev.push(curr)
        return prev
      }
    }, []).map(ObjectId)
    //console.log(uniqueTags)
    
    const image = {
      url: fields.imageUrl, // could have to be with URL
      description: fields.description,
      tags: uniqueTags
    }
    Image.create(image).then(image => {
      res.writeHead(302, {
        location: '/'
      })
      res.end()
    }).catch(err => {
      res.writeHead(500, {
        'content-type': 'text/plain'
      })
      res.write('500 Server Error 2')
      res.end()
    })
  })
}
