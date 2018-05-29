module.exports = (request, response) => {
  if (request.path === '/addMovie' && request.method === 'GET') {
    response.writeHTML('./views/addMovie.html');
  } else {
    return true;
  }
};
