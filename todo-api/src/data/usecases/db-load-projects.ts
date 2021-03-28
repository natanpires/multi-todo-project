import { LoadProjects } from '@/domain/usecases'
import { LoadProjectsRepository } from '@/data/protocols'

export class DbLoadProjects implements LoadProjects {
  constructor (private readonly loadProjectsRepository: LoadProjectsRepository) {}

  async load (accountId: string): Promise<LoadProjects.Result> {
    return this.loadProjectsRepository.loadAll(accountId)
  }
}
