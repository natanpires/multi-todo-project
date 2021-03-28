import { UpsertProject } from '@/domain/usecases'

export interface UpsertProjectRepository {
  upsert: (projectId: string, data: UpsertProjectRepository.Params) => Promise<void>
}

export namespace UpsertProjectRepository {
  export type Params = UpsertProject.Params
}
