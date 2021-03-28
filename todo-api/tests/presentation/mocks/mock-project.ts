import { AddProject, LoadProjects, DeleteProject, UpsertProject } from '@/domain/usecases'
import { mockProjectModels } from '@/tests/domain/mocks'

export class AddProjectSpy implements AddProject {
  params: AddProject.Params

  async add (params: AddProject.Params): Promise<void> {
    this.params = params
  }
}

export class LoadProjectsSpy implements LoadProjects {
  accountId: string
  result = mockProjectModels()

  async load (accountId: string): Promise<LoadProjects.Result> {
    this.accountId = accountId
    return this.result
  }
}

export class DeleteProjectSpy implements DeleteProject {
  id: string

  async delete (id: string): Promise<void> {
    this.id = id
  }
}

export class UpsertProjectSpy implements UpsertProject {
  projectId: string
  params: UpsertProject.Params

  async upsert (projectId: string, params: UpsertProject.Params): Promise<void> {
    this.projectId = projectId
    this.params = params
  }
}
