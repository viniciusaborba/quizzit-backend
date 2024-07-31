import { CreateUserUseCase } from 'src/use-cases/users/create'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

export async function makeUser() {
  let usersRepository: InMemoryUsersRepository
  let createUserUseCase: CreateUserUseCase

  usersRepository = new InMemoryUsersRepository()
  createUserUseCase = new CreateUserUseCase(usersRepository)

  const user = await createUserUseCase.execute({
    name: 'user-test',
    email: 'test@email.com',
    password: '123456',
  })

  return user
}
