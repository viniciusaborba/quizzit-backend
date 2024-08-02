import { Question } from '@prisma/client'
import { Either, left, right } from 'src/@types/either'
import { NotFoundError } from 'src/errors/not-found-error'
import { QuestionsRepository } from 'src/repositories/questions-repository'

interface GetManyQuestionsBySubjectIdUseCaseRequest {
  subjectId: string
  page: number
}

type GetManyQuestionsBySubjectIdUseCaseResponse = Either<
  NotFoundError,
  {
    questions: Question[]
  }
>

export class GetManyQuestionsBySubjectIdUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    subjectId,
    page,
  }: GetManyQuestionsBySubjectIdUseCaseRequest): Promise<GetManyQuestionsBySubjectIdUseCaseResponse> {
    const questions = await this.questionsRepository.findManyBySubjectId(
      subjectId,
      page,
    )

    if (!questions) {
      return left(new NotFoundError())
    }

    return right({
      questions,
    })
  }
}
