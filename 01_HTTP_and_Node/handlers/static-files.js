const fs = require('fs');
const path = require('path');
const url = require('url');

function getContentType (url) {
  let contentType = 'text/plain';
  if (url.endsWith('.css')) {
    contentType = 'text/css';
  } else if (url.endsWith('.ico')) {
    contentType = 'image/x-icon';
  } else if (url.endsWith('.png')) {
    contentType = 'image/png';
  } else if (url.endsWith('.jpg')) {
    contentType = 'image/jpg';
  } else if (url.endsWith('.js')) {
    contentType = 'application/javascript';
  }
  return contentType;
}

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname;
  if (req.pathname.startsWith('/content/') && req.method === 'GET') {
    let filePath = path.normalize(path.join(__dirname, `..${req.pathname}`));
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, {
          'Content-type': 'text/plain'
        });
        res.write('Resource not found!');
        res.end();
      }

      res.writeHead(200, {
        'Content-type': getContentType(req.pathname)
      });

      res.write(data);
      res.end();
    });
  } else {
    return true;
  }
};
