import { Question } from '@prisma/client'
import { Either, right } from 'src/@types/either'
import { QuestionsRepository } from 'src/repositories/questions-repositories'

interface CreateQuestionRequest {
  title?: string
  context?: string
  statement: string
  userId: string
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
  }: CreateQuestionRequest): Promise<CreateQuestionResponse> {
    const question = await this.questionsRepository.create({
      statement,
      title,
      context,
      userId,
    })

    return right({
      question,
    })
  }
}
