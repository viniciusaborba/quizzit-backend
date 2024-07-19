import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { NotFoundError } from 'src/errors/not-found-error'
import { makeReadUserUseCase } from 'src/factories/users/make-read-user-use-case'
import { ReadUserPresenter } from 'src/presenter/read-user-presenter'
import { z } from 'zod'

export async function readUserRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/:userId',
    {
      schema: {
        summary: 'Read user',
        tags: ['Read'],
        params: z.object({
          userId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            user: z.object({
              id: z.string().uuid(),
              name: z.string().nullable(),
              email: z.string().email(),
              avatarImage: z.string().nullable(),
              description: z.string().nullable(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { userId } = req.params

      const readUserUseCase = makeReadUserUseCase()

      const result = await readUserUseCase.execute({
        userId,
      })

      if (result.isLeft()) {
        throw new NotFoundError('User not found!')
      }

      const user = result.value.user

      return res.status(201).send({
        user: ReadUserPresenter.toHTTP(user),
      })
    },
  )
}
