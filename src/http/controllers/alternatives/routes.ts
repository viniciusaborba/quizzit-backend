import { FastifyInstance } from 'fastify'

import { deleteAlternativeRoute } from './delete'
import { updateAlternativeRoute } from './update'

export async function alternativesRoutes(app: FastifyInstance) {
  app.register(deleteAlternativeRoute)
  app.register(updateAlternativeRoute)
}
