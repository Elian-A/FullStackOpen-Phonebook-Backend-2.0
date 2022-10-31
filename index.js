const express = require('express')
let persons = require('./persons.js')
const app = express()

app.get("/api/persons", (req, res) => {
  res.json(persons)
})

app.get("/info", (req, res) => {
  const info = `Phonebook has info for ${persons.length} people\n ${new Date()}`
  res.send(info)
})

app.listen(3001)