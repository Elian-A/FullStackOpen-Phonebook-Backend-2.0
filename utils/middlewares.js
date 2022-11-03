
const unknownEndpoint = (req, res) => res.status(404).send({ error: 'Unknow endpoint' })
const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    res.status(400).send({ error: 'Invalid Id' })
  }
  if (error.name === 'ValidationError') {
    res.status(400).send({ error: error.message })
  }
  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler
}
