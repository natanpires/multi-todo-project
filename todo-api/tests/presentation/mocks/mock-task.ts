import { AddTask, LoadTasks, DeleteTask, UpsertTask } from '@/domain/usecases'
import { mockTaskModels } from '@/tests/domain/mocks'

export class AddTaskSpy implements AddTask {
  params: AddTask.Params

  async add (params: AddTask.Params): Promise<void> {
    this.params = params
  }
}

export class LoadTasksSpy implements LoadTasks {
  accountId: string
  projectId: string
  result = mockTaskModels()

  async load (projectId: string, accountId: string): Promise<LoadTasks.Result> {
    this.accountId = accountId
    this.projectId = projectId
    return this.result
  }
}

export class DeleteTaskSpy implements DeleteTask {
  taskId: string

  async delete (taskId: string): Promise<void> {
    this.taskId = taskId
  }
}

export class UpsertTaskSpy implements UpsertTask {
  taskId: string
  params: UpsertTask.Params

  async upsert (taskId: string, params: UpsertTask.Params): Promise<void> {
    this.taskId = taskId
    this.params = params
  }
}
