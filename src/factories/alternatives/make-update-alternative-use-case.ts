import { PrismaAlternativesRepository } from 'src/repositories/prisma/prisma-alternatives-repository'
import { UpdateAlternativeUseCase } from 'src/use-cases/alternatives/update'

export function makeUpdateAlternativeUseCase() {
  const prismaAlternativesRepository = new PrismaAlternativesRepository()
  const useCase = new UpdateAlternativeUseCase(prismaAlternativesRepository)

  return useCase
}
