import { Prisma, Question } from '@prisma/client'

export interface QuestionsRepository {
  create(data: Prisma.QuestionUncheckedCreateInput): Promise<Question>
  findById(id: number): Promise<Question | null>
  delete(id: number): Promise<void>
  update(id: number, data: Prisma.QuestionUncheckedUpdateInput): Promise<void>
}
