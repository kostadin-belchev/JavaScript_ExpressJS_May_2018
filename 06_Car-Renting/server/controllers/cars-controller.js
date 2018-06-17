const Car = require('../data/Car')
const User = require('mongoose').model('User')
const url = require('url')
const qs = require('querystring')

module.exports = {
  addCarGet: (req, res) => {
    res.render('cars/create')
  },
  addCarPost: (req, res) => {
    // add car to datebase and then render same page
    let formData = req.body
    // console.log('formData:')
    // console.log(formData)
    Car.findOne({})
      .where('make').equals(formData.make)
      .where('model').equals(formData.model)
      .where('color').equals(formData.color)
      .then((existingCar) => {
      if (existingCar) {
        existingCar.numberOfCars++
        existingCar.isRented = false
        existingCar.save().then(() => {
            res.render('cars/create', {status: true})
        })
      } else {
        Car.create({
        make: formData.make,
        model: formData.model,
        imageUrl: formData.imageUrl,
        color: formData.color
        }).then((newCarAdded) => {
        // console.log('new car added '+ newCarAdded)
        res.render('cars/create', {status: true})
        })
      }
    })
  },
  seeAllGet: (req, res) => {
    Car.find({}).where('numberOfCars').gt(0)
    //.where('isRented').equals(false)
    .then((availableCars) => {
      res.render('cars/all', {availableCars})
    })
  },
  rentGet: (req, res) => {
    let targetCarId = qs.parse(url.parse(req.url).query).id
    // console.log(targetCarId)
    Car.findById(targetCarId).then((targetCar) => {
        let isAdmin = false
        if (req.user.username === 'Admin') {
          isAdmin = true
        }
        // target car is already an object so no need to pass it within {}
        res.render('cars/rent', {
          targetCar,
          isAdmin
        })
    })
  },
  rentPost: (req, res) => {
    let targetCarId = qs.parse(url.parse(req.url).query).id
    Car.findById(targetCarId).then((targetCar) => {
      // target car is already an object so no need to pass it within {}
      console.log('target car: ')
      console.log(targetCar)
      if (targetCar.numberOfCars > 0 && targetCar.isRented === false) {
        targetCar.timesRented++
        targetCar.numberOfCars--
        if (targetCar.numberOfCars === 0) {
          targetCar.isRented = true
        }
        targetCar.save().then(() => {
          let currLoggedUserId = req.user.id
          // console.log('id of user: ')
          // console.log(currLoggedUserId)
          User.findById(currLoggedUserId).then((currLoggedUser) => {
            currLoggedUser.rentedCars.push(targetCar._id)
            currLoggedUser.save().then(() => {
              res.render('cars/rent', targetCar)
            })
          })
        })
      } else {
        targetCar.save().then(() => {
          res.render('cars/rent', targetCar)
        })
      }
    })
  },
  editGet: (req, res) => {
    let targetCarId = qs.parse(url.parse(req.url).query).id
    // console.log(targetCarId)
    Car.findById(targetCarId).then((targetCar) => {
      // target car is already an object so no need to pass it within {}
      res.render('cars/edit', targetCar)
    })
  },
  editPost: (req, res) => {
    let formData = req.body
    console.log('formData:')
    console.log(formData)
    let targetCarId = qs.parse(url.parse(req.url).query).id
    // console.log(targetCarId)
    Car.findById(targetCarId).then((targetCar) => {
      targetCar.make = formData.make
      targetCar.model = formData.model
      targetCar.imageUrl = formData.imageUrl
      targetCar.color = formData.color
      targetCar.save().then(() => {
        res.render('cars/edit', {
          status: true
        })
      })
    })
  }
}