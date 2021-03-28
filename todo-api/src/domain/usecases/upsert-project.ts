import { ProjectModel } from '@/domain/models'

export interface UpsertProject {
  upsert: (projectId: string, data: UpsertProject.Params) => Promise<void>
}

export namespace UpsertProject {
  export type Params = Omit<Partial<ProjectModel>, 'id'>
}
