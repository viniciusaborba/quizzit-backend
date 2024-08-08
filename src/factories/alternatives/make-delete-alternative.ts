import { PrismaAlternativesRepository } from 'src/repositories/prisma/prisma-alternatives-repository'
import { DeleteAlternativeUseCase } from 'src/use-cases/alternatives/delete'

export function makeDeleteAlternativeUseCase() {
  const prismaAlternativesRepository = new PrismaAlternativesRepository()
  const useCase = new DeleteAlternativeUseCase(prismaAlternativesRepository)

  return useCase
}
