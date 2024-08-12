import { Prisma } from '@prisma/client'
import { prisma } from 'src/lib/prisma'

import { AlternativesRepository } from '../alternatives-repository'

export class PrismaAlternativesRepository implements AlternativesRepository {
  async findById(id: string) {
    const question = await prisma.alternative.findUnique({
      where: {
        id,
      },
    })

    return question
  }

  async update(id: string, data: Prisma.AlternativeUncheckedUpdateInput) {
    await prisma.alternative.update({
      where: {
        id,
      },
      data,
    })
  }

  async delete(id: string) {
    await prisma.alternative.delete({
      where: {
        id,
      },
    })
  }
}
