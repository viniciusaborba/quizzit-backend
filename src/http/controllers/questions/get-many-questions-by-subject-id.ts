import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { NotFoundError } from 'src/errors/not-found-error'
import { makeGetManyQuestionsBySubjectIdUseCase } from 'src/factories/questions/make-get-many-questions-by-subject-id'
import { z } from 'zod'

export async function getManyQuestionsBySubjectIdRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/questions/subjects/:subjectId',
    {
      schema: {
        summary: 'Get Many Questions By Subject Id',
        tags: ['Read'],
        params: z.object({
          subjectId: z.string().uuid(),
        }),
        querystring: z.object({
          page: z.coerce.number(),
        }),
        response: {
          200: z.object({
            questions: z.array(
              z.object({
                id: z.number(),
                title: z.string().nullable(),
                statement: z.string(),
                context: z.string().nullable(),
                createdAt: z.date(),
                subjectId: z.string().uuid(),
              }),
            ),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { subjectId } = req.params

      const { page } = req.query

      const getManyQuestionsBySubjectIdUseCase =
        makeGetManyQuestionsBySubjectIdUseCase()

      const result = await getManyQuestionsBySubjectIdUseCase.execute({
        subjectId,
        page,
      })

      if (result.isLeft()) {
        throw new NotFoundError('Question not found!')
      }

      const questions = result.value.questions

      return res.status(200).send({
        questions,
      })
    },
  )
}
