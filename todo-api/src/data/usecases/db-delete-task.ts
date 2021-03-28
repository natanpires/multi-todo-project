import { DeleteTask } from '@/domain/usecases'
import { DeleteTaskRepository } from '@/data/protocols'

export class DbDeleteTask implements DeleteTask {
  constructor (private readonly deleteTaskRepository: DeleteTaskRepository) {}

  async delete (taskId: string): Promise<void> {
    await this.deleteTaskRepository.delete(taskId)
  }
}
