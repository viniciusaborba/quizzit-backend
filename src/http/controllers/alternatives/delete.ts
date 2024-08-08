import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { left } from 'src/@types/either'
import { NotFoundError } from 'src/errors/not-found-error'
import { makeDeleteAlternativeUseCase } from 'src/factories/alternatives/make-delete-alternative'
import { z } from 'zod'

export async function deleteAlternativeRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/alternatives/:alternativeId',
    {
      schema: {
        summary: 'Delete alternative',
        tags: ['auth'],
        params: z.object({
          alternativeId: z.string().uuid(),
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
      const { alternativeId } = req.params

      const deleteAlternativeUseCase = makeDeleteAlternativeUseCase()

      const result = await deleteAlternativeUseCase.execute({
        alternativeId,
      })

      if (result.isLeft()) {
        return left(new NotFoundError('Alternative not found!'))
      }

      return res.status(204).send()
    },
  )
}
