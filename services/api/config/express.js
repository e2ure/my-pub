const express = require('express')
const bodyParser = require('body-parser')
const bearerToken = require('express-bearer-token')
const cors = require('cors')
const { join } = require('path')
const socket = require('socket.io')
const { authenticate } = require('@my-pub/db')
const {
  customResponse,
  launch,
  databaseConnectionFailedLog,
} = require('@my-pub/utils')
const vars = require('@my-pub/vars')
const pjson = require('../package.json')

const { api, env } = vars
const routes = require('../v1/routes')

const initRoutes = app => {
  app.use('/api/v1', routes)

  // default when the route does not exist
  app.all('*', (req, res) => {
    res.status(404).send("you're lost?")
  })
}

const initMiddlewares = app => {
  app.use(express.static(join(__dirname, '../public')))
  app.use(bodyParser.json({ limit: '50mb', extended: true }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

  app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'http://my-pub.net',
        'http://my-pub.com',
      ],
    })
  )

  app.use(bearerToken())

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.removeHeader('X-Powered-By')
    next()
  })

  customResponse({ express: app })
}

process.on('SIGINT', () => {
  // some other closing procedures go here
  process.exit(1)
})

module.exports.init = async () => {
  const app = express()
  initMiddlewares(app)
  initRoutes(app)

  const { dbInitialized, error: errDb } = await authenticate()

  if (!dbInitialized) {
    databaseConnectionFailedLog(errDb)
    process.exit(1)
  }

  app.use((error, req, res, next) => {
    const { status = 500 } = error
    res.status(status).error(error)

    next()
  })
  const server = app
    .listen(api.port, () => {
      launch({
        ENV: env,
        PORT: api.port,
        HOST: api.path,
        IP: api.ip,
        VERSION: pjson.version,
        NAME: api.name,
      })
    })
    .on('error', err => {
      console.log(err)
    })

  // se agrega socket
  const io = socket.listen(server)
  app.request.io = io

  return app
}
