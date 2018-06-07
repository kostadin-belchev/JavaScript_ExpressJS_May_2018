const Image = require('mongoose').model('Image')
const Tag = require('mongoose').model('Tag')
const formidable = require('formidable')
const fs = require('fs')

module.exports = (req, res) => {
    if (req.pathname === '/search') {
      let form = new formidable.IncomingForm()
      form.parse(req, function (err, fields) {
        if (err) {
          console.log(err)
          return
        }
        if (fields.tagName && fields.afterDate && fields.beforeDate) {
          let userTags = fields.tagName.split(',').filter(e => e !== '').map(e => e.trim())
  
          Tag.find({tagName: {$in: userTags}}).then(data => {
            let arrayOfIds = data.map(m => m._id)
  
            fs.readFile('./views/results.html', 'utf8', (err, originalHtml) => {
              if (err) {
                console.log(err)
                return
              }
  
              let imageHtml = ''
  
              Image.find({tags: arrayOfIds.toString()}).sort({creationDate: -1}).where('creationDate').gt(fields.afterDate).lt(fields.beforeDate).limit(fields.Limit * 1).then((data) => {
                for (const image of data) {
                  imageHtml += imageTemplate(image)
                }
  
                let htmlToRender = originalHtml.replace(`<div class="replaceMe"></div>`, imageHtml)
  
                res.writeHead(200, {
                  'Content-type': 'text/html'
                })
                res.write(htmlToRender)
                res.end()
              })
            })
          })
        } else if (fields.tagName && fields.afterDate) {
          let userTags = fields.tagName.split(',').filter(e => e !== '').map(e => e.trim())
  
          Tag.find({tagName: {$in: userTags}}).then(data => {
            let arrayOfIds = data.map(m => m._id)
  
            fs.readFile('./views/results.html', 'utf8', (err, originalHtml) => {
              if (err) {
                console.log(err)
                return
              }
  
              let imageHtml = ''
  
              Image.find({tags: arrayOfIds.toString()}).sort({creationDate: -1}).where('creationDate').gt(fields.afterDate).limit(fields.Limit * 1).then((data) => {
                for (const image of data) {
                  imageHtml += imageTemplate(image)
                }
  
                let htmlToRender = originalHtml.replace(`<div class="replaceMe"></div>`, imageHtml)
  
                res.writeHead(200, {
                  'Content-type': 'text/html'
                })
                res.write(htmlToRender)
                res.end()
              })
            })
          })
        } else if (fields.beforeDate) {
          fs.readFile('./views/results.html', 'utf8', (err, originalHtml) => {
            if (err) {
              console.log(err)
              return
            }
  
            let imageHtml = ''
  
            Image.find({}).where('creationDate').lt(fields.beforeDate).limit(fields.Limit * 1).then((data) => {
              for (const image of data) {
                imageHtml += imageTemplate(image)
              }
  
              let htmlToRender = originalHtml.replace(`<div class="replaceMe"></div>`, imageHtml)
  
              res.writeHead(200, {
                'Content-type': 'text/html'
              })
              res.write(htmlToRender)
              res.end()
            })
          })
        } else if (fields.afterDate) {
          fs.readFile('./views/results.html', 'utf8', (err, originalHtml) => {
            if (err) {
              console.log(err)
              return
            }
  
            let imageHtml = ''
  
            Image.find({}).where('creationDate').gt(fields.afterDate).limit(fields.Limit * 1).then((data) => {
              for (const image of data) {
                imageHtml += imageTemplate(image)
              }
  
              let htmlToRender = originalHtml.replace(`<div class="replaceMe"></div>`, imageHtml)
  
              res.writeHead(200, {
                'Content-type': 'text/html'
              })
              res.write(htmlToRender)
              res.end()
            })
          })
        } else if (fields.tagName) {
          let userTags = fields.tagName.split(',').filter(e => e !== '').map(e => e.trim())
  
          Tag.find({tagName: {$in: userTags}}).then(data => {
           
            let arrayOfIds = data.map(m => m._id)
  
            fs.readFile('./views/results.html', 'utf8', (err, originalHtml) => {
              if (err) {
                console.log(err)
                return
              }
  
              let imageHtml = ''
  
              Image.find({tags: {$in: arrayOfIds}}).sort({creationDate: -1}).limit(fields.Limit * 1).then((data) => {
                for (const image of data) {
                  imageHtml += imageTemplate(image)
                }
  
                let htmlToRender = originalHtml.replace(`<div class="replaceMe"></div>`, imageHtml)
  
                res.writeHead(200, {
                  'Content-type': 'text/html'
                })
                res.write(htmlToRender)
                res.end()
              }).catch(err => console.log(err))
            })
          })
        } else {
          fs.readFile('./views/results.html', 'utf8', (err, originalHtml) => {
            if (err) {
              console.log(err)
              return
            }
  
            let imageHtml = ''
  
            Image.find({}).then((data) => {
              for (const image of data) {
                imageHtml += imageTemplate(image)
              }
  
              let htmlToRender = originalHtml.replace(`<div class="replaceMe"></div>`, imageHtml)
  
              res.writeHead(200, {
                'Content-type': 'text/html'
              })
              res.write(htmlToRender)
              res.end()
            })
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