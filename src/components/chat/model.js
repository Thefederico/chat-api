const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ChatSchema = new Schema({
  users: [
    {
      type: Schema.ObjectId,
      ref: 'User'
    }
  ]
})

const model = mongoose.model('Chat', ChatSchema)

module.exports = model
