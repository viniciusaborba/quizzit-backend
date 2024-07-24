import { FastifyInstance } from 'fastify'

import { createQuestionRoute } from './create'
import { deleteQuestionRoute } from './delete'

export async function questionsRoutes(app: FastifyInstance) {
  app.register(createQuestionRoute)
  app.register(deleteQuestionRoute)
}
