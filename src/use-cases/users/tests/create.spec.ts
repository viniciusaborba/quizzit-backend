import { compare } from 'bcryptjs'
import { left } from 'src/@types/either'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { CreateUserUseCase } from '../create'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Register user', async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should be able to register a user', async () => {
    const res = await sut.execute({
      name: 'user-test',
      email: 'test@email.com',
      password: '123456',
    })

    if (res.isLeft()) {
      return left(new Error())
    }

    const user = res.value.user

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to use hash user password upon registration', async () => {
    const res = await sut.execute({
      name: 'user-test',
      email: 'test@email.com',
      password: '123456',
    })

    if (res.isLeft()) {
      return left(new Error())
    }

    const user = res.value.user

    if (!user.password) {
      return null
    }

    const isPasswordHashedCorrectly = await compare('123456', user.password)

    expect(isPasswordHashedCorrectly).toBe(true)
  })
})
