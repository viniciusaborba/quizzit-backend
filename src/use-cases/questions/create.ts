import { Question } from '@prisma/client'
import { Either, right } from 'src/@types/either'
import { QuestionsRepository } from 'src/repositories/questions-repository'

interface CreateQuestionRequest {
  title?: string
  statement: string
  context?: string
  userId: string
  subjectId: string
}

type CreateQuestionResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    title,
    statement,
    context,
    userId,
    subjectId,
  }: CreateQuestionRequest): Promise<CreateQuestionResponse> {
    const question = await this.questionsRepository.create({
      statement,
      title,
      context,
      userId,
      subjectId,
    })

    return right({
      question,
    })
  }
}
