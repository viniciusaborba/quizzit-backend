import { Subject } from '@prisma/client'
import { Either, left, right } from 'src/@types/either'
import { SubjectAlreadyExistsError } from 'src/errors/subject-already-exists'
import { SubjectsRepository } from 'src/repositories/subjects-repository'
import { formatToSlug } from 'src/utils/format-to-slug'

interface CreateSubjectRequest {
  name: string
  description: string
}

type CreateSubjectResponse = Either<
  SubjectAlreadyExistsError,
  {
    subject: Subject
  }
>

export class CreateSubjectUseCase {
  constructor(private subjectsRepository: SubjectsRepository) {}

  async execute({
    name,
    description,
  }: CreateSubjectRequest): Promise<CreateSubjectResponse> {
    const slugAlreadyExists = await this.subjectsRepository.findBySlug(
      formatToSlug(name),
    )

    if (slugAlreadyExists) {
      return left(new SubjectAlreadyExistsError())
    }

    const subject = await this.subjectsRepository.create({
      name,
      description,
      slug: formatToSlug(name),
    })

    return right({
      subject,
    })
  }
}
