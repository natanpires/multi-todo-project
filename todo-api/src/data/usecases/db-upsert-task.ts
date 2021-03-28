import { UpsertTask } from '@/domain/usecases'
import { UpsertTaskRepository } from '@/data/protocols'

export class DbUpsertTask implements UpsertTask {
  constructor (private readonly upsertTaskRepository: UpsertTaskRepository) {}

  async upsert (taskId: string, data: UpsertTask.Params): Promise<void> {
    await this.upsertTaskRepository.upsert(taskId, data)
  }
}
