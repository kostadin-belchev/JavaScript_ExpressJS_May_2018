const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let carSchema = new mongoose.Schema({
  make: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  model: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  imageUrl: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  color: String,
  isRented: { type: Boolean, default: false },
  timesRented: { type: Number, default: 0 },
  numberOfCars: { type: Number, default: 1 }
})

let Car = mongoose.model('Car', carSchema)

module.exports = Car
