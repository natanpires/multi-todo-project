import { DeleteProject } from '@/domain/usecases'
import { DeleteProjectRepository } from '@/data/protocols'

export class DbDeleteProject implements DeleteProject {
  constructor (private readonly deleteProjectRepository: DeleteProjectRepository) {}

  async delete (projectId: string): Promise<void> {
    await this.deleteProjectRepository.delete(projectId)
  }
}
