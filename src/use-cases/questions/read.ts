import { Either, left, right } from 'src/@types/either'
import { NotFoundError } from 'src/errors/not-found-error'
import {
  QuestionsRepository,
  QuestionWithAlternatives,
} from 'src/repositories/questions-repository'

interface ReadQuestionUseCaseRequest {
  questionId: number
}

type ReadQuestionUseCaseResponse = Either<
  NotFoundError,
  {
    question: QuestionWithAlternatives
  }
>

export class ReadQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
  }: ReadQuestionUseCaseRequest): Promise<ReadQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findByIdRead(questionId)

    if (!question) {
      return left(new NotFoundError())
    }

    return right({
      question,
    })
  }
}
