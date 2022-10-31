const express = require('express')
let persons = require('./persons.js')
const app = express()

app.get("/api/persons", (req, res) => {
  res.json(persons)
})

app.listen(3001)