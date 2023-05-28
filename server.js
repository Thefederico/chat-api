const express = require('express')
const http = require('http')
const cors = require('cors')

const router = require('./src/routes/routes')
const db = require('./src/db')
const socket = require('./socket')

db.connect()

const app = express()
const server = http.Server(app)

app.use(cors())
app.use(express.json())
app.use('/app', express.static('public'))

socket.connect(server)

router(app)

server.listen(3000, () => {
  console.log('Server is up on port 3000')
})

module.exports = server
