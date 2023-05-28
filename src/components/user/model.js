const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String
})

const model = mongoose.model('User', UserSchema)

module.exports = model
