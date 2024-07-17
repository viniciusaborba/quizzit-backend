import { FastifyInstance } from 'fastify'

import { createUserRoute } from './create'

export async function usersRoutes(app: FastifyInstance) {
  app.register(createUserRoute)
}
