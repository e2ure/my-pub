const jwt = require('jsonwebtoken')
const StandardError = require('standard-error')
const vars = require('@my-pub/vars')

const { jwt: jwtSecret } = vars.secrets

async function sign(payload, options = {}, secret = jwtSecret) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        return reject(new StandardError(err, { status: 403, code: 'E_JWT' }))
      }

      return resolve(token)
    })
  })
}

async function verify(token, options = {}, secret = jwtSecret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, options, (err, decoded) => {
      if (err) {
        return reject(new StandardError(err, { status: 403, code: 'E_JWT' }))
      }

      return resolve(decoded)
    })
  })
}

module.exports = {
  sign,
  verify,
}
