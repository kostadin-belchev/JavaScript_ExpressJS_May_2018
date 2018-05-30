const http = require('http');
const port = 3000;
const handlers = require('./handlers');

http.createServer((request, response) => {
  for (const handler of handlers) {
    if (handler(request, response) !== true) {
      break;
    }
  }
}).listen(port);
