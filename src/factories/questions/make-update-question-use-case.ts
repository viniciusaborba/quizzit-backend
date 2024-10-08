import { PrismaQuestionsRepository } from 'src/repositories/prisma/prisma-questions-repository'
import { UpdateQuestionUseCase } from 'src/use-cases/questions/update'

export function makeUpdateQuestionUseCase() {
  const prismaQuestionsRepository = new PrismaQuestionsRepository()
  const useCase = new UpdateQuestionUseCase(prismaQuestionsRepository)

  return useCase
}
