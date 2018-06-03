const qs = require('querystring')
const fs = require('fs')

module.exports = (request, response) => {
  if (request.path === '/addMovie' && request.method === 'GET') {
    response.writeHTML('./views/addMovie.html')
  } else if (request.path === '/addMovie' && request.method === 'POST') {
    let body = []
    request.on('data', (chunk) => {
      body.push(chunk)
    }).on('end', () => {
      body = Buffer.concat(body).toString()
      let movieToPush = qs.parse(body)

      fs.readFile('./views/addMovie.html', (err, data) => {
        if (err) {
          console.log(err)
          return
        }
        response.writeHead(200, {
          'content-type': 'text/html'
        })

        if (Object.values(movieToPush).includes('')) {
          data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>')
        } else {
          request.db.push(movieToPush)
          data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', '<div id="successBox"><h2 id="successMsg">Movie Added</h2></div>')
        }

        response.write(data)
        response.end()
      })
    })
  } else {
    return true
  }
}
