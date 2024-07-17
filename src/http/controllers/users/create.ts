import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { UserAlreadyExistsError } from 'src/errors/user-already-exists'
import { makeCreateUserUseCase } from 'src/factories/users/make-create-user-repository'
import { z } from 'zod'

export async function createUserRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        summary: 'Create new user',
        tags: ['auth'],
        body: z.object({
          name: z.string().optional(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          201: z.object({
            userId: z.string().uuid(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { email, name, password } = req.body

      const createUserUseCase = makeCreateUserUseCase()

      const result = await createUserUseCase.execute({
        name,
        email,
        password,
      })

      if (result.isLeft()) {
        throw new UserAlreadyExistsError('User already exists!')
      }

      const user = result.value.user

      return res.status(201).send({
        userId: user.id,
      })
    },
  )
}
