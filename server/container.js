const awilix = require('awilix')
// eslint-disable-next-line no-unused-vars
const { createContainer, asValue, asFunction, asClass } = awilix

function configureContainer () {
  // Create our DI container
  const container = createContainer({ strict: true })

  // Register our dependencies
  container.register({
    DB_CONNECTION_STRING: asValue(process.env.DBCONN, {
      lifetime: awilix.Lifetime.SINGLETON
    })
  })

  return container
}

module.exports = configureContainer
