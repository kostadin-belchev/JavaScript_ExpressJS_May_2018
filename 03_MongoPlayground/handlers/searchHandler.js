const fs = require('fs')
const Image = require('./../models/ImageSchema')
const Tag = require('./../models/TagSchema')

module.exports = (req, res) => {
  if (req.pathname === '/search') {
    fs.readFile('./views/results.html', (err, data) => {
      if (err) {
        throw err
      }
      const params = {}
      if (req.pathquery.afterDate) {
        
      }
      if (req.pathquery.tagName) {
        const tags = req.pathquery.tagName.split(',').filter(e => e.length > 0)
        if (tags.length > 0) {
          Tag.find({tagName: { $in: tags}}).then(tagData => {
            const tagIds = tagData.map(m => m._id)
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