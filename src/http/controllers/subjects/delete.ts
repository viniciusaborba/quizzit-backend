import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { left } from 'src/@types/either'
import { NotFoundError } from 'src/errors/not-found-error'
import { makeDeleteSubjectUseCase } from 'src/factories/subjects/make-delete-subject-use-case'
import { z } from 'zod'

export async function deleteSubjectRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/subjects/:subjectId',
    {
      schema: {
        summary: 'Delete subject',
        tags: ['auth'],
        params: z.object({
          subjectId: z.string().uuid(),
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
      const { subjectId } = req.params

      const deleteSubjectUseCase = makeDeleteSubjectUseCase()

      const result = await deleteSubjectUseCase.execute({
        subjectId,
      })

      if (result.isLeft()) {
        return left(new NotFoundError('Subject not found!'))
      }

      return res.status(204).send()
    },
  )
}
