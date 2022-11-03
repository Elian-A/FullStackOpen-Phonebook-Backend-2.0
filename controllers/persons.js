const personRouter = require('express').Router()
const Person = require('../models/person')

personRouter.get('/', (_, res) => {
  Person.find({}).then((persons) => res.json(persons))
})

personRouter.post('/', (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) return res.status(400).send({ error: 'name and number are required' })
  const newPerson = new Person({ name, number })
  newPerson.save().then((person) => res.status(201).json(person)).catch((err) => next(err))
})

personRouter.get('/:id', (req, res, next) => {
  const { id } = req.params
  Person.findById(id).then((person) => res.json(person)).catch((err) => next(err))
})

personRouter.delete('/:id', (req, res, next) => {
  const { id } = req.params
  Person.findByIdAndDelete(id).then((deletedObject) => {
    if (!deletedObject) return res.status(404).end()
    res.status(204).end()
  }).catch((err) => next(err))
})

personRouter.put('/:id', (req, res, next) => {
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

personRouter.get('/info', (req, res) => {
  Person.find({})
    .then((persons) => {
      res.send(`Phonebook has info for ${persons.length} people\n ${new Date()}`)
    })
})

module.exports = personRouter
