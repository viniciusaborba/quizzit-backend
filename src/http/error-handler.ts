import { FastifyInstance } from 'fastify'
import { InvalidCredentialsError } from 'src/errors/invalid-credentials-error'
import { UserAlreadyExistsError } from 'src/errors/user-already-exists'
import { ZodError } from 'zod'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = async (
  error,
  request,
  reply,
) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation Error',
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof UserAlreadyExistsError) {
    reply.status(400).send({ message: error.message })
  }

  if (error instanceof InvalidCredentialsError) {
    reply.status(400).send({ message: error.message })
  }

  console.error(error)
  return reply.status(500).send({ message: 'Internal server error ' })
}
