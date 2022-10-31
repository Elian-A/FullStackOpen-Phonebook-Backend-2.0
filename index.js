const express = require('express')
let persons = require('./persons.js')
const app = express()
app.use(express.json())

app.get("/api/persons", (_, res) => {
  res.json(persons)
})

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body

  if (!name || !number) return res.status(400).send({ error: `name and number are required` })
  if (persons.some(p => p.name === name)) {
    return res.status(400).send({ error: `name must be unique` })
  }

  const newPerson = {
    name,
    number,
    id: Math.round(Math.random() * 10000)
  }
  persons = [...persons, newPerson]
  res.status(201).json(persons)
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