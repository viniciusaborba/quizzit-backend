import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { makeCreateSubjectUseCase } from 'src/factories/subjects/make-create-subject-use-case'
import { z } from 'zod'

export async function createSubjectRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/subjects',
    {
      schema: {
        summary: 'Create new subject',
        tags: ['auth'],
        body: z.object({
          name: z.string(),
          description: z.string(),
        }),
        response: {
          201: z.object({
            subjectId: z.string().uuid(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { description, name } = req.body

      const createSubjectUseCase = makeCreateSubjectUseCase()

      const result = await createSubjectUseCase.execute({
        name,
        description,
      })

      if (result.isLeft()) {
        throw new Error('')
      }

      const subject = result.value.subject

      return res.status(201).send({
        subjectId: subject.id,
      })
    },
  )
}
