const isLoggedIn = require('./isLoggedIn')
const asyncWrapper = require('./asyncWrapper')

module.exports = {
  asyncWrapper,
  isLoggedIn: asyncWrapper(isLoggedIn),
}
