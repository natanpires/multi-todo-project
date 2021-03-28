import { ProjectMongoRepository } from '@/infra/db'
import { UpsertProject } from '@/domain/usecases'
import { DbUpsertProject } from '@/data/usecases'

export const makeDbUpsertProject = (): UpsertProject => {
  return new DbUpsertProject(new ProjectMongoRepository())
}
