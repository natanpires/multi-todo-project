import { AddTask } from '@/domain/usecases'
import { AddTaskRepository } from '@/data/protocols'

export class DbAddTask implements AddTask {
  constructor (private readonly addTaskRepository: AddTaskRepository) {}

  async add (data: AddTask.Params): Promise<void> {
    await this.addTaskRepository.add(data)
  }
}
