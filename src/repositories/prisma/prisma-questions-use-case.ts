import { Prisma } from '@prisma/client'
import { prisma } from 'src/lib/prisma'

import { QuestionsRepository } from '../questions-repositories'

export class PrismaQuestionsRepository implements QuestionsRepository {
  async create(data: Prisma.QuestionUncheckedCreateInput) {
    const question = await prisma.question.create({
      data,
    })

    return question
  }
}
