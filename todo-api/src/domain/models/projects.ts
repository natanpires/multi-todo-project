import { TaskModel } from './tasks'

export type ProjectModel = {
  id: string
  name: string
  date: Date
  projectId: string
  accountId?: string
  tasks?: TaskModel[]
}
