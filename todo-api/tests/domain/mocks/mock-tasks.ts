import { TaskModel } from '@/domain/models'
import { AddTask } from '@/domain/usecases'

import faker from 'faker'

export const mockTaskModel = (projectId?: string, accountId?: string): TaskModel => {
  return {
    id: faker.random.uuid(),
    name: faker.random.words(),
    projectId,
    taskId: faker.random.uuid(),
    accountId,
    isFinished: false,
    finishedAt: null,
    date: faker.date.recent()
  }
}

export const mockTaskModels = (projectId?: string, accountId?: string): TaskModel[] => [
  mockTaskModel(projectId),
  mockTaskModel(projectId)
]

export const mockAddTaskParams = (projectId?: string, accountId?: string): AddTask.Params => ({
  name: faker.random.words(),
  accountId,
  taskId: faker.random.uuid(),
  projectId,
  isFinished: false,
  finishedAt: null,
  date: faker.date.recent()
})
