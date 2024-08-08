import { Either, left, right } from 'src/@types/either'
import { NotFoundError } from 'src/errors/not-found-error'
import { AlternativesRepository } from 'src/repositories/alternatives-repository'

interface DeleteAlternativeRequest {
  alternativeId: string
}

type DeleteAlternativeResponse = Either<NotFoundError, null>

export class DeleteAlternativeUseCase {
  constructor(private alternativesRepository: AlternativesRepository) {}

  async execute({
    alternativeId,
  }: DeleteAlternativeRequest): Promise<DeleteAlternativeResponse> {
    const alternative =
      await this.alternativesRepository.findById(alternativeId)

    if (!alternative) {
      return left(new NotFoundError('Alternative not found!'))
    }

    await this.alternativesRepository.delete(alternative.id)

    return right(null)
  }
}
