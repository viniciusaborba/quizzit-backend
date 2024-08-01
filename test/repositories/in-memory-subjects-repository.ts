import { Prisma, Subject } from '@prisma/client'
import { randomUUID } from 'crypto'
import { SubjectsRepository } from 'src/repositories/subjects-repository'

export class InMemorySubjectsRepository implements SubjectsRepository {
  public items: Subject[] = []

  async findById(id: string): Promise<Subject | null> {
    const subject = this.items.find((item) => item.id === id)

    if (!subject) {
      return null
    }

    return subject
  }

  async findBySlug(slug: string): Promise<Subject | null> {
    const subject = this.items.find((item) => item.slug === slug)

    if (!subject) {
      return null
    }

    return subject
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === id)

    if (index !== -1) {
      this.items.splice(index, 1)
    }
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
