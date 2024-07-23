import { Prisma, Subject } from '@prisma/client'
import { prisma } from 'src/lib/prisma'

import { SubjectsRepository } from '../subjects-repository'

export class PrismaSubjectsRepository implements SubjectsRepository {
  async findBySlug(slug: string): Promise<Subject | null> {
    const subject = await prisma.subject.findUnique({
      where: {
        slug,
      },
    })

    return subject
  }

  async create(data: Prisma.SubjectCreateInput) {
    const subject = await prisma.subject.create({
      data,
    })

    return subject
  }
}
