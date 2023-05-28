const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MessageSchema = new Schema({
  chat: {
    type: Schema.ObjectId,
    ref: 'Chat'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
    required: true
  },
  date: Date,
  file: String
})

const model = mongoose.model('Message', MessageSchema)

module.exports = model
