const StandardError = require('standard-error')
const { jwt } = require('@my-pub/utils')
const { User } = require('@my-pub/db')

/**
 * Este middleware verifica que se haya declarado un user-token
 * de lo contrario indicar un error.
 */
async function isLoggedIn(req) {
  let isApiJWTDeclared = false

  if (req.token && req.token !== 'undefined') {
    isApiJWTDeclared = true
    req.token = await jwt.verify(req.token)
  }

  if (!isApiJWTDeclared) {
    throw new StandardError('JWT token no fue encontrado y es necesario.', {
      status: 401,
    })
  }

  req.user = await User.findOne({ id: req.token.id })

  if (!req.user) {
    throw new StandardError('El usuario asociado al token no existe.', {
      status: 401,
    })
  }
}

module.exports = isLoggedIn
