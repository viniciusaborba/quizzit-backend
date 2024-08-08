import { FastifyInstance } from 'fastify'

import { deleteAlternativeRoute } from './delete'

export async function alternativesRoutes(app: FastifyInstance) {
  app.register(deleteAlternativeRoute)
}
