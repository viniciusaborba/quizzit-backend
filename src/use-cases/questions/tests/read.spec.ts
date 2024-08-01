import { left } from 'src/@types/either'
import { makeQuestion } from 'test/factories/make-question'
import { makeSubject } from 'test/factories/make-subject'
import { makeUser } from 'test/factories/make-user'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { ReadQuestionUseCase } from '../read'

let questionsRepository: InMemoryQuestionsRepository
let sut: ReadQuestionUseCase

describe('Read question', async () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new ReadQuestionUseCase(questionsRepository)
  })

  it('should be able to read a question', async () => {
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

    const questionRes = await makeQuestion(user.id, subject.id)

    if (questionRes.isLeft()) {
      return left(new Error())
    }

    if (questionRes.isLeft()) {
      return left(new Error())
    }

    const question = questionRes.value.question

    await sut.execute({
      questionId: question.id,
    })

    expect(question.id).toEqual(expect.any(Number))
    expect(question.statement).toBe('test-question-statement')
  })

  it('should not be able to read a nonexistent question', async () => {
    const result = await sut.execute({
      questionId: 1,
    })

    expect(result.isLeft()).toBe(true)
  })
})
