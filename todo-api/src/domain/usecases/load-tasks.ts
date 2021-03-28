import { TaskModel } from '@/domain/models'

export interface LoadTasks {
  load: (projectId: string, accountId: string) => Promise<LoadTasks.Result>
}

export namespace LoadTasks {
  export type Result = TaskModel[]
}
