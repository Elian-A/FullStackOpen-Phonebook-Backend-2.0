const express = require('express')
const { connect } = require('mongoose')

const cors = require('cors')
const morgan = require('morgan')
morgan.token('body', (req) => JSON.stringify(req.body))

const { MONGO_URI } = require('./utils/config')
const { unknownEndpoint, errorHandler } = require('./utils/middlewares')
const { info, error } = require('./utils/logger')
const personsRouter = require('./controllers/persons')

const app = express()

connect(MONGO_URI).then(() => info('DB Connected'))
  .catch((err) => error(`Error: ${err.message}`))

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use('/api/persons', personsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
