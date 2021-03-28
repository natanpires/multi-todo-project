import { UpsertProject } from '@/domain/usecases'
import { UpsertProjectRepository } from '@/data/protocols'

export class DbUpsertProject implements UpsertProject {
  constructor (private readonly upsertProjectRepository: UpsertProjectRepository) {}

  async upsert (projectId: string, data: UpsertProject.Params): Promise<void> {
    await this.upsertProjectRepository.upsert(projectId, data)
  }
}
