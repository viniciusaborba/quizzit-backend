import { Prisma, Subject } from '@prisma/client'
import { randomUUID } from 'crypto'
import { SubjectsRepository } from 'src/repositories/subjects-repository'

export class InMemorySubjectsRepository implements SubjectsRepository {
  public items: Subject[] = []

  async findBySlug(slug: string): Promise<Subject | null> {
    const subject = this.items.find((item) => item.slug === slug)

    if (!subject) {
      return null
    }

    return subject
  }

  async create(data: Prisma.SubjectCreateInput): Promise<Subject> {
    const subject = {
      id: randomUUID(),
      name: data.name,
      slug: data.slug,
      description: data.description,
    }

    return subject
  }
}
