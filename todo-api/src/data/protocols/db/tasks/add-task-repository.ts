import { AddTask } from '@/domain/usecases'

export interface AddTaskRepository {
  add: (data: AddTaskRepository.Params) => Promise<void>
}

export namespace AddTaskRepository {
  export type Params = AddTask.Params
}
