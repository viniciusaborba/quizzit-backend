import { notStrictEqual } from 'assert'
import { FastifyInstance } from 'fastify'
import { InvalidAlternativesFormatError } from 'src/errors/invalid-alternatives-format'
import { InvalidCredentialsError } from 'src/errors/invalid-credentials-error'
import { NotAllowedError } from 'src/errors/not-allowed-error'
import { NotFoundError } from 'src/errors/not-found-error'
import { SubjectAlreadyExistsError } from 'src/errors/subject-already-exists'
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

  if (error instanceof InvalidAlternativesFormatError) {
    reply.status(400).send({ message: error.message })
  }

  if (error instanceof SubjectAlreadyExistsError) {
    reply.status(400).send({ message: error.message })
  }

  if (error instanceof NotAllowedError) {
    reply.status(401).send({ message: error.message })
  }

  if (error instanceof NotFoundError) {
    reply.status(400).send({ message: error.message })
  }

  if (error instanceof InvalidCredentialsError) {
    reply.status(400).send({ message: error.message })
  }

  if (error instanceof UserAlreadyExistsError) {
    reply.status(409).send({ message: error.message })
  }

  if (error instanceof notStrictEqual) {
    reply.status(404).send({ message: error.message })
  }

  console.error(error)
  return reply.status(500).send({ message: 'Internal server error ' })
}
