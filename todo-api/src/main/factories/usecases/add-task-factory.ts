import { AddTask } from '@/domain/usecases'
import { TaskMongoRepository } from '@/infra/db'
import { DbAddTask } from '@/data/usecases'

export const makeDbAddTask = (): AddTask => {
  const projectMongoRepository = new TaskMongoRepository()
  return new DbAddTask(projectMongoRepository)
}
