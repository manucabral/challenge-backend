/**
 * @file Contains the database configuration.
 */

const { Sequelize } = require('sequelize')
const { DATABASE } = require('./config')

const sequelize = new Sequelize(
  DATABASE.NAME,
  DATABASE.USERNAME,
  DATABASE.PASSWORD,
  {
    host: DATABASE.HOST,
    dialect: DATABASE.DIALECT,
  }
)

const connectDatabase = async () => {
  try {
    await sequelize.sync({
      force: DATABASE.FILL,
    })
    console.log(`Database ${DATABASE.NAME} connected successfully`)
    if (DATABASE.FILL) {
      console.log('Filling the database ..')
      const fill = require('./utils/database')
      await fill(sequelize.models.user)
    }
  } catch (error) {
    console.log('Unable to connect to the database:', error)
  }
}

module.exports = {
  sequelize,
  connectDatabase,
}
