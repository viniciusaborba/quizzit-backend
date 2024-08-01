import { CreateQuestionUseCase } from 'src/use-cases/questions/create'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

export async function makeQuestion(userId: string, subjectId: string) {
  let questionsRepository: InMemoryQuestionsRepository
  let createQuestionUseCase: CreateQuestionUseCase

  questionsRepository = new InMemoryQuestionsRepository()
  createQuestionUseCase = new CreateQuestionUseCase(questionsRepository)

  const question = await createQuestionUseCase.execute({
    statement: 'test-question-statement',
    context: 'test-question-context',
    userId,
    title: 'test-question-title',
    subjectId,
  })

  return question
}
