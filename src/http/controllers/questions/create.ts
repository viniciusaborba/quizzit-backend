import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { InvalidAlternativesFormatError } from 'src/errors/invalid-alternatives-format'
import { makeCreateQuestionUseCase } from 'src/factories/questions/make-create-question-use-case'
import { z } from 'zod'

export async function createQuestionRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/questions',
    {
      schema: {
        summary: 'Create new question',
        tags: ['auth'],
        body: z.object({
          title: z.string().optional(),
          context: z.string().optional(),
          statement: z.string().min(10),
          userId: z.string().uuid(),
          subjectId: z.string().uuid(),
          alternatives: z.array(
            z.object({
              content: z.string(),
              isCorrect: z.boolean().default(false),
            }),
          ),
        }),
        response: {
          201: z.object({
            questionId: z.number(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { statement, context, title, userId, subjectId, alternatives } =
        req.body

      const createQuestionUseCase = makeCreateQuestionUseCase()

      const result = await createQuestionUseCase.execute({
        statement,
        context,
        userId,
        title,
        subjectId,
        alternatives,
      })

      if (result.isLeft()) {
        throw new InvalidAlternativesFormatError('Invalid alternatives format!')
      }

      const question = result.value.question

      return res.status(201).send({
        questionId: question.id,
      })
    },
  )
}
