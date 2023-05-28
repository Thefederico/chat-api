const express = require('express')

const controller = require('./controller')
const response = require('../../routes/response')

const router = express.Router()

router.get('/', (req, res) => {
  controller
    .getUsers()
    .then(userList => {
      response.success(req, res, userList, 200)
    })
    .catch(e => {
      response.error(req, res, 'Unexpected Error', 500, e)
    })
})

router.post('/', (req, res) => {
  const { name } = req.body

  controller
    .addUser(name)
    .then(data => {
      response.success(req, res, data, 201)
    })
    .catch(e => {
      response.error(req, res, 'Internal error', 500, e)
    })
})

module.exports = router
