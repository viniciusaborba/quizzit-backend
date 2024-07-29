import { Either, left, right } from 'src/@types/either'
import { NotAllowedError } from 'src/errors/not-allowed-error'
import { NotFoundError } from 'src/errors/not-found-error'
import { QuestionsRepository } from 'src/repositories/questions-repositories'

export interface UpdateQuestionRequest {
  title?: string
  context?: string
  statement?: string
  userId: string
  subjectId?: string
  questionId: number
}

type UpdateQuestionResponse = Either<NotFoundError | NotAllowedError, null>

export class UpdateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    title,
    statement,
    context,
    userId,
    questionId,
    subjectId,
  }: UpdateQuestionRequest): Promise<UpdateQuestionResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new NotFoundError())
    }

    if (userId !== question.userId) {
      return left(new NotAllowedError())
    }

    question.statement = statement ?? question.statement
    ;(question.context = context ?? question.context),
      (question.title = title || question.title),
      (question.subjectId = subjectId || question.subjectId)

    await this.questionsRepository.update(question.id, question)

    return right(null)
  }
}
