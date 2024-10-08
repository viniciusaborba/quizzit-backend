import { Prisma, Question } from '@prisma/client'

export interface Alternative {
  content: string
  isCorrect: boolean
}

export type QuestionWithAlternatives = Question & {
  alternatives: Alternative[]
}
export interface QuestionsRepository {
  create(
    data: Prisma.QuestionUncheckedCreateInput,
    alternatives: Alternative[],
  ): Promise<Question>
  findById(id: number): Promise<Question | null>
  findByIdRead(id: number): Promise<QuestionWithAlternatives | null>
  findManyBySubjectId(id: string, page: number): Promise<Question[]>
  delete(id: number): Promise<void>
  update(id: number, data: Prisma.QuestionUncheckedUpdateInput): Promise<void>
}
