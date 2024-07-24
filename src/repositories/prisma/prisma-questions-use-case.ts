import { prisma } from 'src/lib/prisma'

import {
  QuestionsRepository,
  QuestionsRepositoryCreateRequestProps,
} from '../questions-repositories'

export class PrismaQuestionsRepository implements QuestionsRepository {
  async findById(id: number) {
    const question = await prisma.question.findUnique({
      where: {
        id,
      },
    })

    return question
  }

  async delete(id: number) {
    await prisma.question.delete({
      where: {
        id,
      },
    })
  }

  async create(data: QuestionsRepositoryCreateRequestProps) {
    const question = await prisma.question.create({
      data: {
        statement: data.statement,
        context: data.context,
        title: data.title,
        userId: data.userId,
        subjects: {
          connect: data.subjects.map((slug) => ({ slug })),
        },
      },
    })

    return question
  }
}
