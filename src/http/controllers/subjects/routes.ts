import { FastifyInstance } from 'fastify'

import { createSubjectRoute } from './create'

export async function subjectsRoutes(app: FastifyInstance) {
  app.register(createSubjectRoute)
}
