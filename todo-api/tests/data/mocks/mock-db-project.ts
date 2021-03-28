import {
  AddProjectRepository,
  LoadProjectsRepository,
  DeleteProjectRepository,
  UpsertProjectRepository
} from '@/data/protocols'
import { mockProjectModels } from '@/tests/domain/mocks'

export class AddProjectRepositorySpy implements AddProjectRepository {
  params: AddProjectRepository.Params

  async add (params: AddProjectRepository.Params): Promise<void> {
    this.params = params
  }
}

export class LoadProjectsRepositorySpy implements LoadProjectsRepository {
  accountId: string
  result = mockProjectModels()

  async loadAll (accountId: string): Promise<LoadProjectsRepository.Result> {
    this.accountId = accountId
    return this.result
  }
}

export class DeleteProjectRepositorySpy implements DeleteProjectRepository {
  projectId: string

  async delete (projectId: string): Promise<void> {
    this.projectId = projectId
  }
}

export class UpsertProjectRepositorySpy implements UpsertProjectRepository {
  params: UpsertProjectRepository.Params
  projectId: string

  async upsert (projectId: string, params: UpsertProjectRepository.Params): Promise<void> {
    this.projectId = projectId
    this.params = params
  }
}
