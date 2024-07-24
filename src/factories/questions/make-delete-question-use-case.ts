import { PrismaQuestionsRepository } from 'src/repositories/prisma/prisma-questions-use-case'
import { DeleteQuestionUseCase } from 'src/use-cases/questions/delete'

export function makeDeleteQuestionUseCase() {
  const prismaQuestionsRepository = new PrismaQuestionsRepository()
  const useCase = new DeleteQuestionUseCase(prismaQuestionsRepository)

  return useCase
}
