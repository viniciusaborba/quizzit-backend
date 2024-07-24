import { left } from 'src/@types/either'
import { CreateSubjectUseCase } from 'src/use-cases/subjects/create'
import { CreateUserUseCase } from 'src/use-cases/users/create'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemorySubjectsRepository } from 'test/repositories/in-memory-subjects-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { CreateQuestionUseCase } from '../create'

let questionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase
let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let subjectsRepository: InMemorySubjectsRepository
let createSubjectUseCase: CreateSubjectUseCase

describe('Create question', async () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(questionsRepository)

    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)

    subjectsRepository = new InMemorySubjectsRepository()
    createSubjectUseCase = new CreateSubjectUseCase(subjectsRepository)
  })

  it('should be able to create a question', async () => {
    const userRes = await createUserUseCase.execute({
      name: 'user-test',
      email: 'test@email.com',
      password: '123456',
    })

    if (userRes.isLeft()) {
      return left(new Error())
    }

    const user = userRes.value.user

    const [subjectRes1, subjectRes2] = await Promise.all([
      createSubjectUseCase.execute({
        name: 'test subject 1',
        description: 'subject-description-1',
      }),
      createSubjectUseCase.execute({
        name: 'test subject 2',
        description: 'subject-description-2',
      }),
    ])

    if (subjectRes1.isLeft()) {
      return left(new Error())
    }

    if (subjectRes2.isLeft()) {
      return left(new Error())
    }

    const subject1 = subjectRes1.value.subject
    const subject2 = subjectRes2.value.subject

    const res = await sut.execute({
      statement: 'test-question-statement',
      context: 'test-question-context',
      userId: user.id,
      title: 'test-question-title',
      subjects: [subject1.slug, subject2.slug],
    })

    if (res.isLeft()) {
      return left(new Error())
    }

    const question = res.value.question

    expect(question.id).toEqual(expect.any(Number))
    expect(question.statement).toBe('test-question-statement')
  })
})
