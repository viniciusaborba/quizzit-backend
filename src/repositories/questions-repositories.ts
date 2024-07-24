import { Question } from '@prisma/client'

export interface QuestionsRepositoryCreateRequestProps {
  title?: string
  context?: string
  statement: string
  userId: string
  subjects: string[]
}

export interface QuestionsRepository {
  create(data: QuestionsRepositoryCreateRequestProps): Promise<Question>
}
