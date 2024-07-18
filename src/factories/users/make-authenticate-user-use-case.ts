import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-user-repositories'
import { AuthenticateUserUseCase } from 'src/use-cases/users/authenticate'

export function makeAuthenticateUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new AuthenticateUserUseCase(prismaUsersRepository)

  return useCase
}
