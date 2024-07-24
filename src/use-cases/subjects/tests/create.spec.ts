import { left } from 'src/@types/either'
import { InMemorySubjectsRepository } from 'test/repositories/in-memory-subjects-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { CreateSubjectUseCase } from '../create'

let subjectsRepository: InMemorySubjectsRepository
let sut: CreateSubjectUseCase

describe('Create subject', async () => {
  beforeEach(() => {
    subjectsRepository = new InMemorySubjectsRepository()
    sut = new CreateSubjectUseCase(subjectsRepository)
  })

  it('should be able to register a subject', async () => {
    const res = await sut.execute({
      name: 'test-subject',
      description: 'subject-description',
    })

    if (res.isLeft()) {
      return left(new Error())
    }

    const subject = res.value.subject

    expect(subject.id).toEqual(expect.any(String))
    expect(subject.name).toBe('test-subject')
  })
})
