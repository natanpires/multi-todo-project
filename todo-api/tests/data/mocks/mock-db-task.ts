import {
  AddTaskRepository,
  LoadTasksRepository,
  DeleteTaskRepository,
  UpsertTaskRepository
} from '@/data/protocols'
import { mockTaskModels } from '@/tests/domain/mocks'

export class AddTaskRepositorySpy implements AddTaskRepository {
  params: AddTaskRepository.Params

  async add (params: AddTaskRepository.Params): Promise<void> {
    this.params = params
  }
}

export class LoadTasksRepositorySpy implements LoadTasksRepository {
  projectId: string
  result = mockTaskModels()

  async loadAll (projectId: string): Promise<LoadTasksRepository.Result> {
    this.projectId = projectId
    return this.result
  }
}

export class DeleteTaskRepositorySpy implements DeleteTaskRepository {
  taskId: string

  async delete (taskId: string): Promise<void> {
    this.taskId = taskId
  }
}

export class UpsertTaskRepositorySpy implements UpsertTaskRepository {
  taskId: string
  params: UpsertTaskRepository.Params

  async upsert (taskId: string, params: UpsertTaskRepository.Params): Promise<void> {
    this.taskId = taskId
    this.params = params
  }
}
