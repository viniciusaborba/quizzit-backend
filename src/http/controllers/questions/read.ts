import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { NotFoundError } from 'src/errors/not-found-error'
import { makeReadQuestionUseCase } from 'src/factories/questions/make-read-question-use-case'
import { ReadQuestionPresenter } from 'src/presenter/read-question-presenter'
import { z } from 'zod'

export async function readQuestionRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/questions/:questionId',
    {
      schema: {
        summary: 'Read question',
        tags: ['Read'],
        params: z.object({
          questionId: z.coerce.number(),
        }),
        response: {
          200: z.object({
            question: z.object({
              id: z.number(),
              title: z.string().nullable(),
              statement: z.string(),
              context: z.string().nullable(),
              createdAt: z.date(),
            }),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { questionId } = req.params

      const readQuestionUseCase = makeReadQuestionUseCase()

      const result = await readQuestionUseCase.execute({
        questionId,
      })

      if (result.isLeft()) {
        throw new NotFoundError('Question not found!')
      }

      const question = result.value.question

      return res.status(200).send({
        question: ReadQuestionPresenter.toHTTP(question),
      })
    },
  )
}
