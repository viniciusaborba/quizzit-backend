import { PrismaQuestionsRepository } from 'src/repositories/prisma/prisma-questions-repository'
import { ReadQuestionUseCase } from 'src/use-cases/questions/read'

export function makeReadQuestionUseCase() {
  const prismaQuestionsRepository = new PrismaQuestionsRepository()
  const useCase = new ReadQuestionUseCase(prismaQuestionsRepository)

  return useCase
}
