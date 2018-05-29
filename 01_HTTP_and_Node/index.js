const http = require('http');
const port = 3000;
// const port2 = 5000

let server = http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });

  response.write('Hello world!');
  response.end();
});

server.listen(port);
