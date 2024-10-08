import { PrismaQuestionsRepository } from 'src/repositories/prisma/prisma-questions-repository'
import { CreateQuestionUseCase } from 'src/use-cases/questions/create'

export function makeCreateQuestionUseCase() {
  const prismaQuestionsRepository = new PrismaQuestionsRepository()
  const useCase = new CreateQuestionUseCase(prismaQuestionsRepository)

  return useCase
}
