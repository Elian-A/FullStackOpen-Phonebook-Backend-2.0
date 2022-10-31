const express = require('express')
let persons = require('./persons.js')
const app = express()

app.get("/api/persons", (req, res) => {
  res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
  const id = +(req.params.id)
  const person = persons.find(person => person.id === id)
  if (!person) return res.status(404).end()
  res.json(person)
})

app.delete("/api/persons/:id", (req, res) => {
  const id = +(req.params.id)
  const person = persons.find(person => person.id === id)
  if (!person) return res.status(404).end()
  persons = persons.filter(person => person.id != id)
  res.status(204).end()
})

app.get("/info", (req, res) => {
  const info = `Phonebook has info for ${persons.length} people\n ${new Date()}`
  res.send(info)
})

app.listen(3001)