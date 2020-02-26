const bluebird = require('bluebird')


function asyncWrapper(...fns) {
  const lastIndex = fns.length - 1
  let serially = false

  if (
    typeof fns[lastIndex] === 'object' &&
    typeof fns[lastIndex].then !== 'function'
  ) {
    serially = fns[lastIndex].serially === true
    fns.pop()
  }

  const multiple = fns.length > 1

  return async (req, res, next) => {
    try {
      if (multiple) {
        if (serially) {
          await bluebird.each(
            fns.map(fn => fn(req, res, next)),
            value => value
          )
        } else {
          await Promise.all(fns.map(fn => fn(req, res, next)))
        }
      } else {
        const [fn] = fns

        await fn(req, res, next)
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = asyncWrapper
