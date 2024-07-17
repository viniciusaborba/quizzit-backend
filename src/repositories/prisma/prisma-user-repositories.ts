import { Prisma } from '@prisma/client'
import { prisma } from 'src/lib/prisma'

import { UsersRepositories } from '../user-repositories'

export class PrismaUsersRepository implements UsersRepositories {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
