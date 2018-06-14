const express = require('express')
const catsRouter = require('./cats/cats-controller')
const bodyParser = require('body-parser')

let app = express()
const port = 1337

app.use(express.static('public'))
// app.use('/static', express.static('public'))
// app.use('/static', express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))

let authenticationFunction = (req, res, next) => {
  console.log('authenticated')
  next()
}

app.get('/home', authenticationFunction, (req, res) => {
  res.send('<h2>Home page</h2><p>This is a home page description. Download file from <a href="/sourceCode">here</a>.</p>')
})

app.post('/save-form', (req, res) => {
  console.log(req.body)
  console.log(req.body.firstName)
  console.log(+req.body.age)
  console.log(req.body)
  res.redirect('/home')
})

app.get('/users/:userId(\\d+)', (req, res) => {
  let paramsObj = req.params
  console.log(paramsObj)
  res.send(`<h2>Profile page</h2><p>This is the profile page of student with id: ${paramsObj.userId}.</p>`)
})

app.get('/users/:userId(\\w+)', (req, res) => {
  let paramsObj = req.params
  res.send(`<h2>Error</h2><p>No student with id: ${paramsObj.userId} found.</p>`)
})

app.get('/about', (req, res) => {
  res.send('<h2>About page</h2><p>This is a description about us.</p>')
})

app.get('/sourceCode', (req, res) => {
  res.download('./04. Introduction-Express.pptx')
})

// add in new routes below
app.get('/about/old', (req, res) => {
  res.redirect('/about')
})

app.use('/cats', catsRouter)

app.get('*', (req, res) => {
  res.send('<h2>Page not found</h2><p>There is no such webpage in our site. Go <a href="/home">home</a>.</p>')
})

app.listen(port, () => console.log(`Listening on port ${port}`))
