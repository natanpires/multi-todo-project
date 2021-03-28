import { TaskMongoRepository } from '@/infra/db'
import { DeleteTask } from '@/domain/usecases'
import { DbDeleteTask } from '@/data/usecases'

export const makeDbDeleteTask = (): DeleteTask => {
  return new DbDeleteTask(new TaskMongoRepository())
}
