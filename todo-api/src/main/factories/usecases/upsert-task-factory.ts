import { TaskMongoRepository } from '@/infra/db'
import { UpsertTask } from '@/domain/usecases'
import { DbUpsertTask } from '@/data/usecases'

export const makeDbUpsertTask = (): UpsertTask => {
  return new DbUpsertTask(new TaskMongoRepository())
}
