/**
 * @file Contains the main entry point for the app.
 */

// required modules
const app = require('./server')
const { connectDatabase } = require('./database')

async function main() {
  // connect to the database
  await connectDatabase()

  // start the server
  app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`)
  })
}

main()
