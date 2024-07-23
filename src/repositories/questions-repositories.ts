import { Question } from '@prisma/client'

interface QuestionsRepositoryCreateProps {
  title?: string
  context?: string
  statement: string
  userId: string
  subjects: string[]
}

export interface QuestionsRepository {
  create(data: QuestionsRepositoryCreateProps): Promise<Question>
}
