import { left } from 'src/@types/either'
import { makeSubject } from 'test/factories/make-subject'
import { makeUser } from 'test/factories/make-user'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { CreateQuestionUseCase } from '../create'
import { DeleteQuestionUseCase } from '../delete'

let questionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase
let createQuestionUseCase: CreateQuestionUseCase

describe('Create question', async () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(questionsRepository)
    createQuestionUseCase = new CreateQuestionUseCase(questionsRepository)
  })

  it('should be able to create a question', async () => {
    const userRes = await makeUser()

    if (userRes.isLeft()) {
      return left(new Error())
    }

    const user = userRes.value.user

    const subjectRes = await makeSubject()

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
