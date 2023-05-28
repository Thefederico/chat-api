const express = require('express')

const response = require('../../routes/response')
const controller = require('./controller')

const router = express.Router()

router.post('/', (req, res) => {
  const { users } = req.body

  controller
    .addChat(users)
    .then(data => {
      response.success(req, res, data, 201)
    })
    .catch(e => {
      response.error(req, res, 'Internal error', 500, e)
    })
})

router.get('/:userId', (req, res) => {
  const { userId } = req.params
  controller
    .getChats(userId)
    .then(users => {
      response.success(req, res, users, 200)
    })
    .catch(e => {
      response.error(req, res, 'Internal error', 500, e)
    })
})

module.exports = router
