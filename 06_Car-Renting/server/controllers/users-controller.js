const encryption = require('../utilities/encryption')
const User = require('mongoose').model('User')
const Car = require('../data/Car')

module.exports = {
  registerGet: (req, res) => {
    res.render('users/register')
  },
  registerPost: (req, res) => {
    let reqUser = req.body
    // Add validations!

    let salt = encryption.generateSalt()
    let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)

    User.create({
      username: reqUser.username,
      firstName: reqUser.firstName,
      lastName: reqUser.lastName,
      salt: salt,
      hashedPass: hashedPassword,
      rentedCars: []
    }).then(user => {
      req.logIn(user, (err, user) => {
        if (err) {
          res.locals.globalError = err
          res.render('users/register', user)
        }

        res.redirect('/')
      })
    })
  },
  loginGet: (req, res) => {
    res.render('users/login')
  },
  loginPost: (req, res) => {
    let reqUser = req.body
    User
      .findOne({ username: reqUser.username }).then(user => {
        if (!user) {
          res.locals.globalError = 'Invalid user data'
          res.render('users/login')
          return
        }

        if (!user.authenticate(reqUser.password)) {
          res.locals.globalError = 'Invalid user data'
          res.render('users/login')
          return
        }

        req.logIn(user, (err, user) => {
          if (err) {
            res.locals.globalError = err
            res.render('users/login')
          }

          res.redirect('/')
        })
      })
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  },
  getHistory: (req, res) => {
    User.findById(req.user.id).then((currLoggeduser) => {
      let allRentedCarIds = currLoggeduser.rentedCars
      // console.log(allRentedCarIds)
      // THIS IS ASYNCH, SHOULD BE IMPLEMENTED IN ANOTHER WAY
      let allRentedCars = []
      for (const carId of allRentedCarIds) {
        Car.findById(carId).then((car) => {
          allRentedCars.push(car)
        })
      }
      res.render('users/me', {allRentedCars})
    })
  }
}
