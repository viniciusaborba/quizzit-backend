import { Either, left, right } from 'src/@types/either'
import { NotAllowedError } from 'src/errors/not-allowed-error'
import { NotFoundError } from 'src/errors/not-found-error'
import { AlternativesRepository } from 'src/repositories/alternatives-repository'

export interface UpdateAlternativeRequest {
  content?: string
  isCorrect?: boolean
  alternativeId: string
}

type UpdateAlternativeResponse = Either<NotFoundError | NotAllowedError, null>

export class UpdateAlternativeUseCase {
  constructor(private alternativesRepository: AlternativesRepository) {}

  async execute({
    content,
    isCorrect,
    alternativeId,
  }: UpdateAlternativeRequest): Promise<UpdateAlternativeResponse> {
    const alternative =
      await this.alternativesRepository.findById(alternativeId)

    if (!alternative) {
      return left(new NotFoundError())
    }

    alternative.content = content ?? alternative.content
    ;(alternative.isCorrect = isCorrect ?? alternative.isCorrect),
      await this.alternativesRepository.update(alternative.id, alternative)

    return right(null)
  }
}
