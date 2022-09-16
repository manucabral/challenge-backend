/**
 * @file Contains the database configuration.
 */

const { Sequelize } = require('sequelize')
const { DATABASE } = require('./config')

const sequelize = new Sequelize(
  DATABASE.NAME,
  DATABASE.USER,
  DATABASE.PASSWORD,
  {
    host: DATABASE.HOST,
    port: DATABASE.PORT,
    dialect: DATABASE.DIALECT,
    logging: false,
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
      const { User, Movie, Genre } = require('./models')
      const fill = require('./utils/database')
      await fill(User)
      await fill(Movie, { bulk: true })
      await fill(Genre, { bulk: true })
    }
  } catch (error) {
    console.log('Unable to connect to the database:', error)
  }
}

module.exports = {
  sequelize,
  connectDatabase,
}
