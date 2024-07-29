import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { makeCreateQuestionUseCase } from 'src/factories/questions/make-create-question-use-case'
import { z } from 'zod'

export async function createQuestionRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/questions',
    {
      schema: {
        summary: 'Create new question',
        tags: ['auth'],
        body: z.object({
          title: z.string().optional(),
          context: z.string().optional(),
          statement: z.string().min(10),
          userId: z.string().uuid(),
          subjectId: z.string().uuid(),
        }),
        response: {
          201: z.object({
            questionId: z.number(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { statement, context, title, userId, subjectId } = req.body

      const createQuestionUseCase = makeCreateQuestionUseCase()

      const result = await createQuestionUseCase.execute({
        statement,
        context,
        userId,
        title,
        subjectId,
      })

      if (result.isLeft()) {
        throw new Error()
      }

      const question = result.value.question

      return res.status(201).send({
        questionId: question.id,
      })
    },
  )
}
