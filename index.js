require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./mongo')

const app = express()

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (_, res) => {
  Person.find({}).then((persons) => res.json(persons))
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) return res.status(400).send({ error: 'name and number are required' })
  const newPerson = new Person({ name, number })
  newPerson.save().then((person) => res.status(201).json(person)).catch((err) => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  Person.findById(id).then((person) => res.json(person)).catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  Person.findByIdAndDelete(id).then((deletedObject) => {
    if (!deletedObject) return res.status(404).end()
    res.status(204).end()
  }).catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  const { name, number } = req.body
  if (!name || !number) return res.status(400).send({ error: 'name and number are required' })
  const updatedPerson = {
    name, number
  }
  Person.findByIdAndUpdate(id, updatedPerson, { new: true, runValidators: true })
    .then((updated) => res.send(updated))
    .catch((err) => next(err))
})

app.get('/info', (req, res) => {
  Person.find({})
    .then((persons) => {
      res.send(`Phonebook has info for ${persons.length} people\n ${new Date()}`)
    })
})

const unknownEndpoint = (req, res) => res.status(404).send({ error: 'Unknow endpoint' })
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    res.status(400).send({ error: 'Invalid Id' })
  }
  if (error.name === 'ValidationError') {
    res.status(400).send({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const { PORT } = process.env
app.listen(PORT)
console.log(`App running on port ${PORT}`)
