import { FastifyInstance } from 'fastify'

import { createSubjectRoute } from './create'
import { deleteSubjectRoute } from './delete'

export async function subjectsRoutes(app: FastifyInstance) {
  app.register(createSubjectRoute)
  app.register(deleteSubjectRoute)
}
