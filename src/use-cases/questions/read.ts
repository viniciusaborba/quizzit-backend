import { Question } from '@prisma/client'
import { Either, left, right } from 'src/@types/either'
import { NotFoundError } from 'src/errors/not-found-error'
import { QuestionsRepository } from 'src/repositories/questions-repositories'

interface ReadQuestionUseCaseRequest {
  questionId: number
}

type ReadQuestionUseCaseResponse = Either<
  NotFoundError,
  {
    question: Question
  }
>

export class ReadQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
  }: ReadQuestionUseCaseRequest): Promise<ReadQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new NotFoundError())
    }

    return right({
      question,
    })
  }
}
