import { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { UsersRepository } from 'src/repositories/users-repositories'

import { Either, left, right } from '../../@types/either'
import { InvalidCredentialsError } from '../../errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<
  InvalidCredentialsError,
  {
    user: User
  }
>

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new InvalidCredentialsError())
    }

    const doesPasswordMatch = await compare(password, user.password!)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return right({
      user,
    })
  }
}
