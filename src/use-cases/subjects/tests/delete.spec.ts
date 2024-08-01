import { left } from 'src/@types/either'
import { makeSubject } from 'test/factories/make-subject'
import { InMemorySubjectsRepository } from 'test/repositories/in-memory-subjects-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { DeleteSubjectUseCase } from '../delete'

let subjectsRepository: InMemorySubjectsRepository
let sut: DeleteSubjectUseCase

describe('Delete subject', async () => {
  beforeEach(() => {
    subjectsRepository = new InMemorySubjectsRepository()
    sut = new DeleteSubjectUseCase(subjectsRepository)
  })

  it('should be able to delete a subject', async () => {
    const subjectRes = await makeSubject()

    if (subjectRes.isLeft()) {
      return left(new Error())
    }

    const subject = subjectRes.value.subject

    await sut.execute({
      subjectId: subject.id,
    })

    expect(subjectsRepository.items.length).toEqual(0)
  })

  it('should not be able to delete a nonexisting subject', async () => {
    const result = await sut.execute({
      subjectId: 'non-existing-subject',
    })

    expect(result.isLeft()).toBe(true)
  })
})
