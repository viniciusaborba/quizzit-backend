import { Question } from '@prisma/client'
import { Either, right } from 'src/@types/either'
import {
  QuestionsRepository,
  QuestionsRepositoryCreateRequestProps,
} from 'src/repositories/questions-repositories'

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
    subjects,
  }: QuestionsRepositoryCreateRequestProps): Promise<CreateQuestionResponse> {
    const question = await this.questionsRepository.create({
      statement,
      title,
      context,
      userId,
      subjects,
    })

    return right({
      question,
    })
  }
}
