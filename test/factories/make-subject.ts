import { CreateSubjectUseCase } from 'src/use-cases/subjects/create'
import { InMemorySubjectsRepository } from 'test/repositories/in-memory-subjects-repository'

export async function makeSubject() {
  let subjectsRepository: InMemorySubjectsRepository
  let createSubjectUseCase: CreateSubjectUseCase

  subjectsRepository = new InMemorySubjectsRepository()
  createSubjectUseCase = new CreateSubjectUseCase(subjectsRepository)

  const subject = await createSubjectUseCase.execute({
    name: 'test subject 1',
    description: 'subject-description-1',
  })

  return subject
}
