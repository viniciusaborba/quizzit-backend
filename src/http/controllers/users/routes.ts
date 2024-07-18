import { FastifyInstance } from 'fastify'

import { authenticateUserRoute } from './authenticate'
import { createUserRoute } from './create'
import { refreshUserRoute } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.register(createUserRoute)
  app.register(authenticateUserRoute)
  app.register(refreshUserRoute)
}
