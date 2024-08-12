import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { makeUpdateAlternativeUseCase } from 'src/factories/alternatives/make-update-alternative-use-case'
import { z } from 'zod'

export async function updateAlternativeRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/alternatives/:alternativeId',
    {
      schema: {
        summary: 'Update new alternative',
        tags: ['auth'],
        params: z.object({
          alternativeId: z.string(),
        }),
        body: z.object({
          content: z.string().optional(),
          isCorrect: z.boolean().optional(),
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
      const { content, isCorrect } = req.body

      const { alternativeId } = req.params

      const updateAlternativeUseCase = makeUpdateAlternativeUseCase()

      const result = await updateAlternativeUseCase.execute({
        content,
        isCorrect,
        alternativeId,
      })

      if (result.isLeft()) {
        throw new Error()
      }

      return res.status(204).send()
    },
  )
}
