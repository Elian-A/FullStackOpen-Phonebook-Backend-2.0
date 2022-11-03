const { createServer } = require('http')
const { PORT } = require('./utils/config')
const { info } = require('./utils/logger')
const app = require('./app')

const server = createServer(app)
server.listen(PORT, () => info(`Server Listening on port ${PORT}`))
