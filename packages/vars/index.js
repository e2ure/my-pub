const dotenv = require('dotenv-safe')
const { join } = require('path')

const env = process.env.NODE_ENV || 'development'

dotenv.config({
  path: join(__dirname, 'env', `.env.${env}`),
  sample: join(__dirname, 'env', '.env.example'),
})

module.exports = {
  appName: process.env.APP_NAME,
  env,
  secrets: {
    jwt: process.env.JWT_SECRET,
    encryptionKey: process.env.ENCRYPTION_KEY,
    encryptionVector: process.env.ENCRYPTION_VECTOR,
  },
  dbs: {
    postgres: {
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      host: process.env.POSTGRES_HOST,
      port: process.env.PORT,
      dialect: 'postgres',
    },
  },
  api: {
    name: process.env.API_NAME,
    path: process.env.API_PATH,
    ip: process.env.API_IP,
    port: parseInt(process.env.API_PORT, 10),
    route: process.env.API_ROUTE,
  },
}
