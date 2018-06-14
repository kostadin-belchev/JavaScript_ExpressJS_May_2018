const fs = require('fs')
const db = require('./../config/dataBase')
const qs = require('querystring')
const url = require('url')
const formidable = require('formidable')
const shortid = require('shortid')

module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res)
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res)
  } else {
    return true
  }
}

function viewAll (req, res) {
  let filePath = './views/viewAll.html'
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    // The memes should be sorted by date.
    let memes = db.getDb()
    // console.log(memes)
    memes.sort((a, b) => {
      return b.dateStamp - a.dateStamp
    })
    // console.log(memes)
    let memesHtml = ''
    for (const meme of memes) {
      memesHtml += memeTemplate(meme)
    }
    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', memesHtml)

    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(data)
    res.end()
  })
}

let fieldChecker = obj => {
  for (let prop in obj) {
    if (obj[prop] === '') {
      return true
    }
  }
}

let defaultResponse = (respString, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.end(respString)
}

function viewAddMeme (req, res, status) {
  fs.readFile('./views/addMeme.html', (err, data) => {
    if (err) {
      console.log(err)
      return
    }

    if (status === 'err') {
      data = data
        .toString()
        .replace(
          '<div id="replaceMe">{{replaceMe}}</div>',
          '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>'
        )
    }
    if (status === 'suc') {
      data = data
        .toString()
        .replace(
          '<div id="replaceMe">{{replaceMe}}</div>',
          '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>'
        )
    }
    defaultResponse(
      data
        .toString()
        .replace('<div id="replaceMe">{{replaceMe2}}</div>', data),
      res
    )
  })
}

function addMeme (req, res) {
  let randomString = shortid.generate()
  let folder = new Date().toJSON().slice(0, 10)
  let filePath = `./public/memeStorage/${folder}/${randomString}.jpg`
  let form = new formidable.IncomingForm()

  fs.access(`./public/memeStorage/${folder}`, (err) => {
    if (err) {
      fs.mkdirSync(`./public/memeStorage/${folder}`)
    }

    form.on('fileBegin', function (name, file) {
      if (file.name !== '') {
        file.path = filePath
        console.log(file)
      }
    })

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(fields)
      console.log(files)
      if (fieldChecker(fields) || files.meme.size === 0) {
        viewAddMeme(req, res, 'err')
      } else {
        let Meme = {
          id: randomString,
          title: fields.memeTitle, // Example of memeSrc: './public/memeStorage/1/{random string}.jpg'
          memeSrc: filePath,
          description: fields.memeDescription,
          privacy: fields.status,
          dateStamp: Date.now()
        }
        db.add(Meme)
        db.save().then(() => {
          console.log('Meme saved')
          res.writeHead(302, {
            location: '/viewAllMemes'
          })
          res.end()
        })
      }
    })
  })
}

function getDetails (req, res) {
  fs.readFile('./views/details.html', (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    req.pathquery = qs.parse(url.parse(req.url).query)
    let targetMemeId = req.pathquery.id
    // we have the id, now we need to pull the meme with the given id and populate the details.html with it
    let memes = db.getDb()
    let targetedMeme = memes.find(target => {
      return target.id === targetMemeId
    })
    // for (const meme of memes) {
    //   if (meme.id === targetMemeId) {
    //     targetedMeme = meme
    //     break
    //   }
    // }
    let memeHtml = singleMemeTemplate(targetedMeme)

    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', memeHtml)
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(data)
    res.end()
  })
}

function memeTemplate (meme) {
  return `<div class="meme">
    <a href="/getDetails?id=${meme.id}">
    <img class="memePoster" src="${meme.memeSrc}"/>          
  </div>`
}

function singleMemeTemplate (targetedMeme) {
  return `<div class="content">
  <img src="${targetedMeme.memeSrc}" alt=""/>
  <h3>Title  ${targetedMeme.title}</h3>
  <p> ${targetedMeme.description}</p>
  <button><a href="${targetedMeme.posterSrc}">Download Meme</a></button>
  </div>`
}
