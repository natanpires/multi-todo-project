import { TaskModel } from '@/domain/models'

export interface AddTask {
  add: (data: AddTask.Params) => Promise<void>
}

export namespace AddTask {
  export type Params = Omit<TaskModel, 'id'>
}
