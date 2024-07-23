import { Prisma, Question } from '@prisma/client'

export interface QuestionsRepository {
  create(data: Prisma.QuestionUncheckedCreateInput): Promise<Question>
}
