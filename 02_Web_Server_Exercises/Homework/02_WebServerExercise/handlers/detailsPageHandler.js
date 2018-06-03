const fs = require('fs')

module.exports = (request, response) => {
  if (request.path.startsWith('/movies/')) {
    let index = request.path.slice(request.path.lastIndexOf('/') + 1)
    console.log(index)
    let movie = request.db[index]
    console.log(movie)
    let movieHtml = `<div class="content">
    <img src="${decodeURIComponent(movie.moviePoster)}" alt=""/>
    <h3>Title  ${(decodeURIComponent(movie.movieTitle)).replace(/\+/g, ' ')}}</h3>
    <h3>Year ${decodeURIComponent(movie.movieYear)}</h3>
    <p> ${(decodeURIComponent(movie.movieDescription)).replace(/\+/g, ' ')}</p>
</div>`
    fs.readFile('./views/details.html', (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', movieHtml)
      response.writeHead(200, {
        'content-type': 'text/html'
      })
      response.write(data)
      response.end()
    })
  }
}
