import { User } from '@prisma/client'
import { Either, left, right } from 'src/@types/either'
import { NotFoundError } from 'src/errors/not-found-error'
import { UsersRepository } from 'src/repositories/users-repositories'

interface ReadUserUseCaseRequest {
  userId: string
}

type ReadUserUseCaseResponse = Either<
  NotFoundError,
  {
    user: User
  }
>

export class ReadUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: ReadUserUseCaseRequest): Promise<ReadUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new NotFoundError())
    }

    return right({
      user,
    })
  }
}
