import { TaskModel } from '@/domain/models'

export interface LoadTasksRepository {
  loadAll: (projectId: string, accountId: string) => Promise<LoadTasksRepository.Result>
}

export namespace LoadTasksRepository {
  export type Result = TaskModel[]
}
