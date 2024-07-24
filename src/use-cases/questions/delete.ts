import { Either, left, right } from 'src/@types/either'
import { NotFoundError } from 'src/errors/not-found-error'
import { QuestionsRepository } from 'src/repositories/questions-repositories'

interface DeleteQuestionRequest {
  questionId: number
}

type DeleteQuestionResponse = Either<NotFoundError, null>

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
  }: DeleteQuestionRequest): Promise<DeleteQuestionResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new NotFoundError())
    }

    await this.questionsRepository.delete(question.id)

    return right(null)
  }
}
