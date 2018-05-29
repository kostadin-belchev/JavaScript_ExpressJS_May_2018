const fs = require('fs');

module.exports = (request, response) => {
  if (request.path.startsWith('/public/') && request.method === 'GET') {
    fs.readFile('.' + request.path, (err, data) => {
      if (err) console.log(err);
      response.writeHead(200, {
        'content-type': contentTypeChecker(request.path)
      });
      response.write(data);
      response.end();
    });
  } else {
    return true;
  }
};

function contentTypeChecker (path) {
  let contentType = 'text/plain';
  if (path.endsWith('.css')) {
    contentType = 'text/css';
  } else if (path.endsWith('.ico')) {
    contentType = 'image/x-icon';
  } else if (path.endsWith('.png')) {
    contentType = 'image/png';
  } else if (path.endsWith('.jpg')) {
    contentType = 'image/jpg';
  } else if (path.endsWith('.js')) {
    contentType = 'application/javascript';
  }
  return contentType;
}
