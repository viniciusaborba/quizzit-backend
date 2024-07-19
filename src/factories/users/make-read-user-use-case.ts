import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-user-repositories'
import { ReadUserUseCase } from 'src/use-cases/users/read'

export function makeReadUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new ReadUserUseCase(prismaUsersRepository)

  return useCase
}
