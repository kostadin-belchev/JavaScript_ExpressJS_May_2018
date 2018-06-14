const express = require('express')
const router = express.Router()

router.use('/create', (req, res, next) => {
  console.log('middleware executed')
  next()
})

router.get('/create', (req, res) => {
  res.send('Cats create page')
})

router.get('/details/:id', (req, res) => {
  res.send(`Details of cat with id: ${req.params.id}`)
})

module.exports = router
