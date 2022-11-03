require('dotenv').config()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const numberValidator = (number) => {
  let counter = 0
  Array(number).forEach((char) => {
    if (/\d/.test(char)) counter += 1
  })
  if (counter >= 8) return true
  return false
}

const uri = process.env.MONGO_URI
mongoose.connect(uri).then(() => console.log('Connected'))
  .catch((err) => console.error(`Error: ${err.message}`))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    unique: true,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: numberValidator,
      message: (props) => `${props.value} is not a valid number`
    },
    unique: true,
    required: true
  }
})
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
