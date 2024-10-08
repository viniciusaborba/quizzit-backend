import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { left } from 'src/@types/either'
import { NotFoundError } from 'src/errors/not-found-error'
import { makeDeleteQuestionUseCase } from 'src/factories/questions/make-delete-question-use-case'
import { z } from 'zod'

export async function deleteQuestionRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/questions/:questionId',
    {
      schema: {
        summary: 'Delete question',
        tags: ['auth'],
        params: z.object({
          questionId: z.coerce.number(),
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
      const { questionId } = req.params

      const deleteQuestionUseCase = makeDeleteQuestionUseCase()

      const result = await deleteQuestionUseCase.execute({
        questionId,
      })

      if (result.isLeft()) {
        return left(new NotFoundError())
      }

      return res.status(204).send()
    },
  )
}
