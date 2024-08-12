import { Prisma } from '@prisma/client'
import { prisma } from 'src/lib/prisma'

import { Alternative, QuestionsRepository } from '../questions-repository'

export class PrismaQuestionsRepository implements QuestionsRepository {
  async findManyBySubjectId(id: string, page: number) {
    const questions = await prisma.question.findMany({
      where: {
        subjectId: id,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions
  }

  async findByIdRead(id: number) {
    const question = await prisma.question.findUnique({
      where: {
        id,
      },
      include: {
        alternatives: true,
      },
    })

    return question
  }

  async findById(id: number) {
    const question = await prisma.question.findUnique({
      where: {
        id,
      },
    })

    return question
  }

  async update(id: number, data: Prisma.QuestionUncheckedUpdateInput) {
    await prisma.question.update({
      where: {
        id,
      },
      data,
    })
  }

  async delete(id: number) {
    await prisma.question.delete({
      where: {
        id,
      },
    })
  }

  async create(
    data: Prisma.QuestionUncheckedCreateInput,
    alternatives: Alternative[],
  ) {
    const question = await prisma.question.create({
      data: {
        ...data,
        alternatives: {
          createMany: {
            data: alternatives.map((alternative) => ({
              content: alternative.content,
              isCorrect: alternative.isCorrect,
            })),
          },
        },
      },
    })

    return question
  }
}
