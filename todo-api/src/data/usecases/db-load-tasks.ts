import { LoadTasks } from '@/domain/usecases'
import { LoadTasksRepository } from '@/data/protocols'

export class DbLoadTasks implements LoadTasks {
  constructor (private readonly loadTasksRepository: LoadTasksRepository) {}

  async load (projectId: string, accountId: string): Promise<LoadTasks.Result> {
    return this.loadTasksRepository.loadAll(projectId, accountId)
  }
}
