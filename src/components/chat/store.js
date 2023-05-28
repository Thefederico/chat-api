const Model = require('./model')

const addChat = async chat => {
  try {
    const newChat = new Model(chat)
    const result = await newChat.save()

    return result
  } catch (error) {
    console.error(error)
    throw new Error('Error al añadir un chat')
  }
}

const getChats = async userId => {
  try {
    const filter = {}
    if (userId) {
      filter.users = userId
    }
    const chats = await Model.find(filter).populate('users').exec()
    return chats
  } catch (error) {
    console.error(error)
    throw new Error('Error al listar los chats')
  }
}

module.exports = {
  add: addChat,
  list: getChats
}
