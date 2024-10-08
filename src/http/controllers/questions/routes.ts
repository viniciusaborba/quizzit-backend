import { FastifyInstance } from 'fastify'

import { createQuestionRoute } from './create'
import { deleteQuestionRoute } from './delete'
import { getManyQuestionsBySubjectIdRoute } from './get-many-questions-by-subject-id'
import { readQuestionRoute } from './read'
import { updateQuestionRoute } from './update'

export async function questionsRoutes(app: FastifyInstance) {
  app.register(createQuestionRoute)
  app.register(deleteQuestionRoute)
  app.register(updateQuestionRoute)
  app.register(readQuestionRoute)
  app.register(getManyQuestionsBySubjectIdRoute)
}
