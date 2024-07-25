import { Question } from '@prisma/client'

export class ReadQuestionPresenter {
  static toHTTP(question: Question) {
    return {
      id: question.id,
      title: question.title,
      statement: question.statement,
      context: question.context,
      createdAt: question.createdAt,
    }
  }
}
