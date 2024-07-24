import { Question } from '@prisma/client'
import {
  QuestionsRepository,
  QuestionsRepositoryCreateRequestProps,
} from 'src/repositories/questions-repositories'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async create(data: QuestionsRepositoryCreateRequestProps) {
    const question = {
      id: Math.random(),
      title: data.title || null,
      context: data.context || null,
      userId: data.userId,
      statement: data.statement,
      subjects: data.subjects,
    }

    return question
  }

  async findById(id: number) {
    const question = this.items.find((item) => item.id === id)

    if (!question) {
      return null
    }

    return question
  }

  async delete(id: number) {
    const index = this.items.findIndex((item) => item.id === id)

    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }
}
