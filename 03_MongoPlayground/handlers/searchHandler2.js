const fs = require('fs')
const Image = require('./../models/ImageSchema')
const Tag = require('./../models/TagSchema')
const formidable = require('formidable')

module.exports = (req, res) => {
  if (req.pathname === '/search') {
    fs.readFile('./views/results.html', (err, data) => {
      if (err) {
        throw err
      }
      const params = {}
      if (fields.tagName && fields.afterDate && fields.beforeDate) {
        let userTags = req.pathquery.tagName.split(',').filter(e => e.length > 0).map(e => e.trim())

        Tag.find({tagName: {$in: userTags}}).then(data => {
          let arrayOfIds = data.map(m => m._id)
        })
      }
      if (req.pathquery.tagName === 'Write tags separted by ,') {
        getImagesAndRespond(params)
      } else if (req.pathquery.tagName) {
        const tags = req.pathquery.tagName.split(',').filter(e => e.length > 0)
        console.log('tags:')
        console.log(tags)
        if (tags.length > 0) {
          Tag.find({tagName: { $in: tags}}).then(tagData => {
            console.log('tagData:')
            console.log(tagData)
            const tagIds = tagData.map(m => m._id)
            console.log('tagIds:')
            console.log(tagIds)
            params.tags = tagIds
            getImagesAndRespond(params)
          })
        } else {
          getImagesAndRespond(params)
        }
      }

      function getImagesAndRespond(params) {
        Image.find(params).then((images) => {
          let imageHtml = ''
          for (let image of images) {
            imageHtml += imageTemplate(image)
          }
          data = data
            .toString()
            .replace(`<div class='replaceMe'></div>`, imageHtml)
          res.writeHead(200, {
            'content-type': 'text/html'
          })
          res.end(data)
        })
      }
    })
  } else {
    return true
  }
}

function imageTemplate(image) {
  return `<fieldset id="${image._id}"> 
    <img src="${image.url}"></img>
    <p>${image.description}<p/>
    <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
    </button> 
    </fieldset>`
}