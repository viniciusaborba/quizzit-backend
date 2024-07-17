import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { Either, left, right } from 'src/@types/either'
import { UserAlreadyExistsError } from 'src/errors/user-already-exists'
import { UsersRepositories } from 'src/repositories/user-repositories'

interface CreateUserRequest {
  name?: string
  email: string
  password: string
}

type CreateUserResponse = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepositories) {}

  async execute({
    email,
    password,
    name,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const passwordHash = await hash(password, 6)

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      return left(new UserAlreadyExistsError())
    }

    const user = await this.usersRepository.create({
      email,
      name,
      password: passwordHash,
    })

    return right({
      user,
    })
  }
}
