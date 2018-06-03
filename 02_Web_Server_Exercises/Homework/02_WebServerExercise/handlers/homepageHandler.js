module.exports = (request, response) => {
  if ((request.path === '/' || request.path === '/home.html') && request.method === 'GET') {
    response.writeHTML('./views/home.html')
  } else {
    return true
  }
}
