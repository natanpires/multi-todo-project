import { ProjectMongoRepository } from '@/infra/db'
import { LoadProjects } from '@/domain/usecases'
import { DbLoadProjects } from '@/data/usecases'

export const makeDbLoadProjects = (): LoadProjects => {
  return new DbLoadProjects(new ProjectMongoRepository())
}
