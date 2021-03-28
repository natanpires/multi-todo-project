import { ProjectModel } from '@/domain/models'

export interface LoadProjectsRepository {
  loadAll: (accountId: string) => Promise<LoadProjectsRepository.Result>
}

export namespace LoadProjectsRepository {
  export type Result = ProjectModel[]
}
