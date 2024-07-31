import { Prisma, Question } from '@prisma/client'
import { QuestionsRepository } from 'src/repositories/questions-repositories'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async update(
    id: number,
    data: Prisma.QuestionUncheckedUpdateInput,
  ): Promise<void> {
    const question = this.items.find((item) => item.id === id)

    if (!question) {
      throw new Error('Question not found!')
    }

    const index = this.items.indexOf(question)

    const newQuestion = {
      id: question.id,
      title: typeof data.title === 'string' ? data.title : question.title,
      context:
        typeof data.context === 'string' ? data.context : question.context,
      statement:
        typeof data.statement === 'string'
          ? data.statement
          : question.statement,
      userId: question.userId,
      subjectId:
        typeof data.subjectId === 'string'
          ? data.subjectId
          : question.subjectId,
      createdAt: question.createdAt,
    }

    this.items.splice(index, 1)

    this.items.push(newQuestion)
  }

  async create(data: Prisma.QuestionUncheckedCreateInput) {
    const question = {
      id: Math.random(),
      title: data.title || null,
      context: data.context || null,
      userId: data.userId,
      statement: data.statement,
      subjectId: data.subjectId,
      createdAt: new Date(),
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
