import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'crypto'
import { UsersRepository } from 'src/repositories/users-repositories'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name || null,
      email: data.email,
      password: data.password || null,
      avatarImage: data.avatarImage || null,
      description: data.description || null,
      role: data.role || 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(user)

    return user
  }
}
