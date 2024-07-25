import { Prisma, Question } from '@prisma/client'

export interface QuestionsRepositoryCreateRequestProps {
  title?: string
  context?: string
  statement: string
  userId: string
  subjects: string[]
}

export interface QuestionsRepositoryUpdateRequestProps {
  title?: string
  context?: string
  statement?: string
  userId: string
  subjects?: string[]
  questionId: number
}

export interface QuestionsRepository {
  create(data: QuestionsRepositoryCreateRequestProps): Promise<Question>
  findById(id: number): Promise<Question | null>
  delete(id: number): Promise<void>
  update(id: number, data: Prisma.QuestionUncheckedUpdateInput): Promise<void>
}
