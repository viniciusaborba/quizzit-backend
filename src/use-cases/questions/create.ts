import { Question } from '@prisma/client'
import { Either, left, right } from 'src/@types/either'
import { InvalidAlternativesFormatError } from 'src/errors/invalid-alternatives-format'
import {
  Alternative,
  QuestionsRepository,
} from 'src/repositories/questions-repository'

interface CreateQuestionRequest {
  title?: string
  statement: string
  context?: string
  userId: string
  subjectId: string
  alternatives: Alternative[]
}

type CreateQuestionResponse = Either<
  InvalidAlternativesFormatError,
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
    alternatives,
  }: CreateQuestionRequest): Promise<CreateQuestionResponse> {
    const atLeastOneAlternativeIsCorrect = alternatives.filter(
      (a) => a.isCorrect,
    )

    if (
      atLeastOneAlternativeIsCorrect.length === 0 ||
      atLeastOneAlternativeIsCorrect.length >= 2
    ) {
      return left(
        new InvalidAlternativesFormatError('Invalid alternatives format!'),
      )
    }

    const question = await this.questionsRepository.create(
      {
        statement,
        title,
        context,
        userId,
        subjectId,
      },
      alternatives,
    )

    return right({
      question,
    })
  }
}
