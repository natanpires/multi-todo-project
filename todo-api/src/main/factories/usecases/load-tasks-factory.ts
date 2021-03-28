import { TaskMongoRepository } from '@/infra/db'
import { LoadTasks } from '@/domain/usecases'
import { DbLoadTasks } from '@/data/usecases'

export const makeDbLoadTasks = (): LoadTasks => {
  return new DbLoadTasks(new TaskMongoRepository())
}
