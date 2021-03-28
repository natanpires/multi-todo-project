import { TaskModel } from '@/domain/models'

export interface UpsertTask {
  upsert: (taskId: string, data: UpsertTask.Params) => Promise<void>
}

export namespace UpsertTask {
  export type Params = Omit<Partial<TaskModel>, 'id'>
}
