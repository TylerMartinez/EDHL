import { createContainer, asValue, asFunction, asClass } from 'awilix'

export function configureContainer() {
  // Create our DI container
  const container = createContainer({ strict: true })

  // Register our dependencies
  container.register(
    'DB_CONNECTION_STRING', asValue(process.env.DBCONN)
  )

  return container
}
