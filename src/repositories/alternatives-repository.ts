import { Alternative } from '@prisma/client'

export interface AlternativesRepository {
  findById(id: string): Promise<Alternative | null>
  delete(id: string): Promise<void>
}
