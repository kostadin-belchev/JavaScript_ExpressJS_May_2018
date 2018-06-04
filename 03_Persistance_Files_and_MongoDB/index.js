const mongoose = require('mongoose')

let connectionString = 'mongodb://localhost:27017/pets'

let penguinSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  color: { type: String }
})

penguinSchema.methods.saysHello = function () {
  return `Hello from ${this.name}!`
}

penguinSchema.virtual('description').get(function () {
  return `${this.name} - ${this.age}\nColor: ${this.color}`
})

let Penguin = mongoose.model('Penguin', penguinSchema)

mongoose.connect(connectionString).then(() => {
  Penguin.findOne({name: 'Pen'}).then(p => {
    console.log(p.saysHello())
    console.log(p.description)
    })
})
