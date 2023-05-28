const success = (_req, res, message, code = 200) => {
  res.status(code).send({
    error: '',
    body: message
  })
}

const error = (_req, res, error, code = 500, details) => {
  console.error('[response error]', details)
  res.status(code).send({
    error,
    body: ''
  })
}

const response = {
  success,
  error
}

module.exports = response
