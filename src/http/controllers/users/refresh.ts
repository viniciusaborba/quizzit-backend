import { FastifyInstance, FastifyReply } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function refreshUserRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/refresh',
    {
      schema: {
        summary: 'Refresh token',
        tags: ['auth'],
        response: {
          201: z.object({
            token: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, res: FastifyReply) => {
      await req.jwtVerify({ onlyCookie: true })

      const role = req.user.role

      const token = await res.jwtSign(
        {
          role,
        },
        {
          sign: {
            sub: req.user.sub,
          },
        },
      )

      return res.status(200).send({
        token,
      })
    },
  )
}
