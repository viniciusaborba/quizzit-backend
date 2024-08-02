import { Alternative, Prisma } from '@prisma/client'

export interface AlternativesRepository {
  create(data: Prisma.AlternativeUncheckedCreateInput): Promise<Alternative[]>
}
