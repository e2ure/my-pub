const {
  env,
  dbs: { postgres },
} = require('@my-pub/vars')

module.exports = {
  [env]: {
    username: postgres.username,
    password: postgres.password,
    database: postgres.database,
    host: postgres.host,
    dialect: postgres.dialect,
    dialectOptions: { ssl: true },
    operatorsAliases: false,
  },
}
