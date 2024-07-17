import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-user-repositories'
import { CreateUserUseCase } from 'src/use-cases/users/create'

export function makeCreateUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new CreateUserUseCase(prismaUsersRepository)

  return useCase
}
