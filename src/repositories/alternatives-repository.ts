import { Alternative, Prisma } from '@prisma/client'

export interface AlternativesRepository {
  findById(id: string): Promise<Alternative | null>
  delete(id: string): Promise<void>
  update(
    id: string,
    data: Prisma.AlternativeUncheckedUpdateInput,
  ): Promise<void>
}
