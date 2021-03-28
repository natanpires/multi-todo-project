import { AddProject } from '@/domain/usecases'

export interface AddProjectRepository {
  add: (data: AddProjectRepository.Params) => Promise<void>
}

export namespace AddProjectRepository {
  export type Params = AddProject.Params
}
