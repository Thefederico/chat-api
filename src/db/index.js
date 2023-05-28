const db = require('mongoose')

db.Promise = global.Promise

const URI = 'mongodb://localhost:27017'

const options = {
  user: 'root',
  pass: 'root',
  dbName: 'chat',
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const connect = async () => {
  await db.connect(URI, options)
  console.log('[db] Conectada con éxito')
}

module.exports = { connect }
