import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { InvalidCredentialsError } from 'src/errors/invalid-credentials-error'
import { makeAuthenticateUserUseCase } from 'src/factories/users/make-authenticate-user-use-case'
import { z } from 'zod'

export async function authenticateUserRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions',
    {
      schema: {
        summary: 'Authenticate user',
        tags: ['auth'],
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          200: z.object({
            token: z.string(),
            role: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { email, password } = req.body

      try {
        const registerUseCase = makeAuthenticateUserUseCase()

        const result = await registerUseCase.execute({
          email,
          password,
        })

        if (result.isLeft()) {
          throw new InvalidCredentialsError('Incorrect email or password!')
        }

        const user = result.value.user

        const token = await res.jwtSign(
          {
            role: user.role,
          },
          {
            sign: {
              sub: user.id,
            },
          },
        )

        return res.status(200).send({
          token,
          role: user.role,
        })
      } catch (err) {
        if (err instanceof InvalidCredentialsError) {
          return res.status(400).send({
            message: 'Incorrect email or password!',
          })
        }

        throw err
      }
    },
  )
}
