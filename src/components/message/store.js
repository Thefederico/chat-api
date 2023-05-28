const Model = require('./model')

const addMessage = async message => {
  try {
    const newMessage = new Model(message)
    const result = await newMessage.save()

    return result
  } catch (error) {
    console.error(error)
    throw new Error('Error al añadir un mensaje')
  }
}

const getMessages = async filterMessages => {
  try {
    let filter = {}
    if (filterMessages !== null) {
      filter = { user: filterMessages }
    }
    const populatedMessages = await Model.find(filter).populate('user').exec()
    return populatedMessages
  } catch (error) {
    console.error(error)
    throw new Error('Error al listar los mensajes')
  }
}

const updateMessage = async (id, message) => {
  const foundMessage = await Model.findOne({
    _id: id
  })
  foundMessage.message = message
  const newMessage = await foundMessage.save()
  return newMessage
}

const removeMessage = async id => {
  const foundMessage = await Model.findOne({
    _id: id
  })
  const deletedMessage = await Model.deleteOne({
    _id: foundMessage._id
  })
  return deletedMessage
}

module.exports = {
  add: addMessage,
  list: getMessages,
  updateText: updateMessage,
  remove: removeMessage
}
