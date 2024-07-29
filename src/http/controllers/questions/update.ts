import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { makeUpdateQuestionUseCase } from 'src/factories/questions/make-update-question-use-case'
import { z } from 'zod'

export async function updateQuestionRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/questions/:questionId',
    {
      schema: {
        summary: 'Update new question',
        tags: ['auth'],
        params: z.object({
          questionId: z.coerce.number(),
        }),
        body: z.object({
          title: z.string().optional(),
          context: z.string().optional(),
          statement: z.string().min(10).optional(),
          userId: z.string().uuid(),
          subjectId: z.string().uuid().optional(),
        }),
        response: {
          204: z.object({}),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { statement, context, title, userId, subjectId } = req.body

      const { questionId } = req.params

      const updateQuestionUseCase = makeUpdateQuestionUseCase()

      const result = await updateQuestionUseCase.execute({
        statement,
        context,
        title,
        questionId,
        userId,
        subjectId,
      })

      if (result.isLeft()) {
        throw new Error()
      }

      return res.status(204).send()
    },
  )
}
