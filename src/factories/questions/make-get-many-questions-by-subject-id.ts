import { PrismaQuestionsRepository } from 'src/repositories/prisma/prisma-questions-repository'
import { GetManyQuestionsBySubjectIdUseCase } from 'src/use-cases/questions/get-questions-by-subject-id'

export function makeGetManyQuestionsBySubjectIdUseCase() {
  const prismaQuestionsRepository = new PrismaQuestionsRepository()
  const useCase = new GetManyQuestionsBySubjectIdUseCase(
    prismaQuestionsRepository,
  )

  return useCase
}
