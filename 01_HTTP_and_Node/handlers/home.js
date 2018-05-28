const url = require('url');
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname;
  if (req.pathname === '/' && req.method === 'GET') {
    // TODO: implement more logic
  } else {
    return true;
  }
};
