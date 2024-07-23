import { Prisma, Subject } from '@prisma/client'

export interface SubjectsRepository {
  create(data: Prisma.SubjectCreateInput): Promise<Subject>
  findBySlug(slug: string): Promise<Subject | null>
}
