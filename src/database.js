/**
 * @file Contains the database configuration.
 */

const { Sequelize } = require('sequelize')
const { DATABASE } = require('./config')

// postgresql://postgres:S8e6fjqfbE975eJvCalM@containers-us-west-80.railway.app:7366/railway
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
      const { User, Movie } = require('./models')
      const fill = require('./utils/database')
      await fill(User)
      await fill(Movie, { bulk: true })
    }
  } catch (error) {
    console.log('Unable to connect to the database:', error)
  }
}

module.exports = {
  sequelize,
  connectDatabase,
}
