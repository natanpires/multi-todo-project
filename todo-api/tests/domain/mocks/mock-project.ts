import { ProjectModel } from '@/domain/models'
import { AddProject } from '@/domain/usecases'

import faker from 'faker'

export const mockProjectModel = (accountId?: string): ProjectModel => {
  return {
    id: faker.random.uuid(),
    name: faker.random.words(),
    projectId: faker.random.uuid(),
    accountId,
    date: faker.date.recent()
  }
}

export const mockProjectModels = (accountId?: string): ProjectModel[] => [
  mockProjectModel(accountId),
  mockProjectModel(accountId)
]

export const mockAddProjectParams = (accountId?: string): AddProject.Params => ({
  name: faker.random.words(),
  accountId,
  projectId: faker.random.uuid(),
  date: faker.date.recent()
})
