import { left } from 'src/@types/either'
import { NotFoundError } from 'src/errors/not-found-error'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { CreateUserUseCase } from '../create'
import { ReadUserUseCase } from '../read'

let usersRepository: InMemoryUsersRepository
let createUser: CreateUserUseCase
let sut: ReadUserUseCase

describe('Read user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new ReadUserUseCase(usersRepository)
    createUser = new CreateUserUseCase(usersRepository)
  })

  it('should be able to read an user', async () => {
    const userCreateResponse = await createUser.execute({
      name: 'user-test',
      email: 'test@email.com',
      password: '123456',
    })

    if (userCreateResponse.isLeft()) {
      return left(new NotFoundError())
    }

    const _user = userCreateResponse.value.user

    const userReadResponse = await sut.execute({
      userId: _user.id,
    })

    if (userReadResponse.isLeft()) {
      return left(new NotFoundError())
    }

    const user = userReadResponse.value.user

    expect(user.name).toEqual('user-test')
  })

  it('should not be able to read a nonexistent user', async () => {
    const result = await sut.execute({
      userId: 'non-existing-user',
    })

    expect(result.isLeft()).toBe(true)
  })
})
