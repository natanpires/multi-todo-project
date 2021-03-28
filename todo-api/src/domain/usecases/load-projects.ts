import { ProjectModel } from '@/domain/models'

export interface LoadProjects {
  load: (accountId: string) => Promise<LoadProjects.Result>
}

export namespace LoadProjects {
  export type Result = ProjectModel[]
}
