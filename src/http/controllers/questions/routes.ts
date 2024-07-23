import { FastifyInstance } from 'fastify'

import { createQuestionRoute } from './create'

export async function questionsRoutes(app: FastifyInstance) {
  app.register(createQuestionRoute)
}
