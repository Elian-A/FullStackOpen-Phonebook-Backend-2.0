require('dotenv').config()
const mongoose = require('mongoose')

const uri = process.env.MONGO_URI
mongoose.connect(uri).then(res => console.log('Connected'))
  .catch(err => console.error(`Error: ${err.message}`))

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Person', personSchema)