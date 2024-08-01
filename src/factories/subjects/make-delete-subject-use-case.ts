import { PrismaSubjectsRepository } from 'src/repositories/prisma/prisma-subjects-repository'
import { DeleteSubjectUseCase } from 'src/use-cases/subjects/delete'

export function makeDeleteSubjectUseCase() {
  const prismaSubjectsRepository = new PrismaSubjectsRepository()
  const useCase = new DeleteSubjectUseCase(prismaSubjectsRepository)

  return useCase
}
