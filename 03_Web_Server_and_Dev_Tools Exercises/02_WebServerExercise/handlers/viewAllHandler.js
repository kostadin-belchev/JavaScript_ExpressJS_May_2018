module.exports = (request, response) => {
  if (request.path === '/viewAllMovies' && request.method === 'GET') {
    response.writeHTML('./views/viewAll.html');
  } else {
    return true;
  }
};
