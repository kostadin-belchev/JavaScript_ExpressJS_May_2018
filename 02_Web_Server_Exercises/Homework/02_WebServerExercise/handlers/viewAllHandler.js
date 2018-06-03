const fs = require('fs')

module.exports = (request, response) => {
  if (request.path === '/viewAllMovies' && request.method === 'GET') {
    fs.readFile('./views/viewAll.html', (err, data) => {
      if (err) {
        console.log(err)
        return
      }

      const movieTemplate = `<div class="movie"><a href="/movies/{{my_id}}"><img class="moviePoster" src={{Your movie poster URL}}/></a></div>`

      let allMovies = request.db
        .sort((a, b) => Number(a.movieYear) - Number(b.movieYear))
        .map(m => movieTemplate.replace('{{Your movie poster URL}}', decodeURIComponent(m.moviePoster)))
        .map((m, i) => m.replace('{{my_id}}', i))
        .join(' ')
      data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', allMovies)

      response.writeHead(200, {
        'Content-Type': 'text/html'
      })
      response.write(data)
      response.end()
    })
  } else {
    return true
  }
}
