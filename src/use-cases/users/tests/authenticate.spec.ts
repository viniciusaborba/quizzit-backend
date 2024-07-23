import { left } from 'src/@types/either'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { AuthenticateUserUseCase } from '../authenticate'
import { CreateUserUseCase } from '../create'

let usersRepository: InMemoryUsersRepository
let registerUser: CreateUserUseCase
let sut: AuthenticateUserUseCase

describe('Authenticate user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(usersRepository)
    registerUser = new CreateUserUseCase(usersRepository)
  })

  it('should be able to authenticate an user', async () => {
    await registerUser.execute({
      name: 'user-test',
      email: 'test@email.com',
      password: '123456',
    })

    const res = await sut.execute({
      email: 'test@email.com',
      password: '123456',
    })

    if (res.isLeft()) {
      return left(new Error())
    }

    const user = res.value.user

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate an nonexisting user', async () => {
    const result = await sut.execute({
      email: 'test@email.com',
      password: '123456',
    })

    expect(result.isLeft()).toBe(true)
  })
})
