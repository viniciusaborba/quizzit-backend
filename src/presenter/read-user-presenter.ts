import { User } from '@prisma/client'

export class ReadUserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      description: user.description,
      avatarImage: user.avatarImage,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
