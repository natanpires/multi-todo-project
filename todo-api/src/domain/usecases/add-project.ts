import { ProjectModel } from '@/domain/models'

export interface AddProject {
  add: (data: AddProject.Params) => Promise<void>
}

export namespace AddProject {
  export type Params = Omit<ProjectModel, 'id'>
}
