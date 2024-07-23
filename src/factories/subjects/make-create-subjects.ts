import { PrismaSubjectsRepository } from 'src/repositories/prisma/prisma-subjects-repository'
import { CreateSubjectUseCase } from 'src/use-cases/subjects/create'

export function makeCreateSubjectUseCase() {
  const prismaSubjectsRepository = new PrismaSubjectsRepository()
  const useCase = new CreateSubjectUseCase(prismaSubjectsRepository)

  return useCase
}
