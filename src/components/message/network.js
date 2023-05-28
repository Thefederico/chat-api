const express = require('express')
const multer = require('multer')

const response = require('../../routes/response')
const controller = require('./controller')

const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/files/',
    filename: (_req, file, cb) => {
      const [name, extension] = file.originalname.split('.')
      const filename = `${name.replace(/\s/g, '')}.${extension}`
      cb(null, filename)
    }
  })
})

const router = express.Router()

router.get('/', (req, res) => {
  const filterMessages = req.query.user || null
  controller
    .getMessages(filterMessages)
    .then(messageList => {
      response.success(req, res, messageList, 200)
    })
    .catch(e => {
      response.error(req, res, 'Unexpected Error', 500, e)
    })
})

router.post('/', upload.single('file'), (req, res) => {
  const { message, user, chat } = req.body
  const file = req.file

  controller
    .addMessage(chat, user, message, file)
    .then(fullMessage => {
      response.success(req, res, fullMessage, 201)
    })
    .catch(e => {
      response.error(req, res, e.message, 400, 'Error en el controlador')
    })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const { message } = req.body

  controller
    .updateMessage(id, message)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(e => {
      response.error(req, res, 'Error interno', 500, e)
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  controller
    .deleteMessage(id)
    .then(() => {
      response.success(req, res, `Mensaje ${id} eliminado`, 200)
    })
    .catch(e => {
      response.error(req, res, 'Error interno', 500, e)
    })
})

module.exports = router
