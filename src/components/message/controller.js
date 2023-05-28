const store = require('./store')
const socket = require('../../../socket').socket

const addMessage = async (chat, user, message, file) => {
  try {
    if (!user || !message || !chat) {
      console.error('[messageController] No hay usuario o mensaje')
      throw new Error('Los datos son incorrectos')
    }

    let fileUrl = ''
    if (file) {
      fileUrl = `http://localhost:3000/app/files/${file.filename}`
    }

    const fullMessage = {
      chat,
      user,
      message,
      date: new Date(),
      file: fileUrl
    }

    const result = await store.add(fullMessage)

    socket.io.emit('message', fullMessage)

    return result
  } catch (error) {
    console.error(error)
    throw new Error(error.message)
  }
}

const getMessages = filterMessages =>
  new Promise((resolve, reject) => {
    resolve(store.list(filterMessages))
  })

const updateMessage = (id, message) => {
  return new Promise((resolve, reject) => {
    if (!id || !message) {
      reject(new Error('Invalid data'))
    }
    store
      .updateText(id, message)
      .then(data => resolve(data))
      .catch(e => reject(e))
  })
}

const deleteMessage = id => {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject(new Error('Id invalido'))
    }
    store
      .remove(id)
      .then(() => resolve())
      .catch(e => reject(e))
  })
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage
}
