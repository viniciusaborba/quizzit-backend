import { left } from 'src/@types/either'
import { CreateSubjectUseCase } from 'src/use-cases/subjects/create'
import { CreateUserUseCase } from 'src/use-cases/users/create'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemorySubjectsRepository } from 'test/repositories/in-memory-subjects-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { CreateQuestionUseCase } from '../create'
import { DeleteQuestionUseCase } from '../delete'

let questionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase
let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let subjectsRepository: InMemorySubjectsRepository
let createSubjectUseCase: CreateSubjectUseCase
let createQuestionUseCase: CreateQuestionUseCase

describe('Create question', async () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(questionsRepository)
    createQuestionUseCase = new CreateQuestionUseCase(questionsRepository)

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

    const subjectRes = await createSubjectUseCase.execute({
      name: 'test subject 1',
      description: 'subject-description-1',
    })

    if (subjectRes.isLeft()) {
      return left(new Error())
    }

    const subject = subjectRes.value.subject

    const questionRes = await createQuestionUseCase.execute({
      statement: 'test-question-statement',
      context: 'test-question-context',
      userId: user.id,
      title: 'test-question-title',
      subjectId: subject.id,
    })

    if (questionRes.isLeft()) {
      return left(new Error())
    }

    const question = questionRes.value.question

    await sut.execute({
      questionId: question.id,
    })

    expect(questionsRepository.items.length).toEqual(0)
  })
})
