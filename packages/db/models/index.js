/* eslint-disable import/no-dynamic-require */
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const {
  dbs: { postgres },
} = require('@my-pub/vars')

const basename = path.basename(__filename)
const db = {}

let sequelize
if(postgres.database_url){
  sequelize = new Sequelize(postgres.database_url,{
    dialect: postgres.dialect,
    protocol: postgres.protocol,
    dialectOptions: { ssl: true },
  }
  )
}else{
  sequelize = new Sequelize(
    postgres.database,
    postgres.username,
    postgres.password,
    {
      host: postgres.host,
      port: postgres.port,
      dialect: postgres.dialect,
      protocol: postgres.protocol,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000,
      },
      dialectOptions: { ssl: true },
    }
  )
}



fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  }).forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

// sequelize.sync()
// sequelize.sync({ force: true })

db.sequelize = sequelize
db.Sequelize = Sequelize

async function authenticate() {
  try {
    await sequelize.authenticate()

    return { dbInitialized: true }
  } catch (error) {
    return { dbInitialized: false, error }
  }
}

module.exports = { ...db, authenticate }
