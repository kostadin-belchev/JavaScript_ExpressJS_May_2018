const http = require('http');
const url = require('url');
const fs = require('fs');
const handlers = require('./handlers/handlers');

const port = 7000;
// const port2 = 5000

let server = http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });

  request.path = url.parse(request.url).pathname;

  response.writeHTML = (path) => {
    fs.readFile(path, (err, data) => {
      if (err) throw (err);

      response.writeHead(200, {
        'content-type': 'text/html'
      });
      response.write(data);
      response.end();
    });
  };

  for (const handler of handlers) {
    if (handler(request, response) !== true) {
      break;
    }
  }
});

server.listen(port);
console.log(`Server listening on port ${port}...`);
