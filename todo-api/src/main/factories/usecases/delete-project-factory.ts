import { ProjectMongoRepository } from '@/infra/db'
import { DeleteProject } from '@/domain/usecases'
import { DbDeleteProject } from '@/data/usecases'

export const makeDbDeleteProject = (): DeleteProject => {
  return new DbDeleteProject(new ProjectMongoRepository())
}
