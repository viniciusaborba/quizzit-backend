import { Either, left, right } from 'src/@types/either'
import { NotFoundError } from 'src/errors/not-found-error'
import { SubjectsRepository } from 'src/repositories/subjects-repository'

interface DeleteSubjectRequest {
  subjectId: string
}

type DeleteSubjectResponse = Either<NotFoundError, null>

export class DeleteSubjectUseCase {
  constructor(private subjectsRepository: SubjectsRepository) {}

  async execute({
    subjectId,
  }: DeleteSubjectRequest): Promise<DeleteSubjectResponse> {
    const subject = await this.subjectsRepository.findById(subjectId)

    if (!subject) {
      return left(new NotFoundError('Subject not found!'))
    }

    await this.subjectsRepository.delete(subject.id)

    return right(null)
  }
}
