import { Either, left, right } from 'src/@types/either'
import { NotAllowedError } from 'src/errors/not-allowed-error'
import { NotFoundError } from 'src/errors/not-found-error'
import {
  QuestionsRepository,
  QuestionsRepositoryUpdateRequestProps,
} from 'src/repositories/questions-repositories'

type UpdateQuestionResponse = Either<NotFoundError | NotAllowedError, null>

export class UpdateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    title,
    statement,
    context,
    userId,
    questionId,
  }: QuestionsRepositoryUpdateRequestProps): Promise<UpdateQuestionResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new NotFoundError())
    }

    if (userId !== question.userId) {
      return left(new NotAllowedError())
    }

    question.statement = statement ?? question.statement
    ;(question.context = context || null), (question.title = title || null)

    await this.questionsRepository.update(question.id, question)

    return right(null)
  }
}
