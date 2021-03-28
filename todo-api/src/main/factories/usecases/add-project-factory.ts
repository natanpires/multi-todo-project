import { AddProject } from '@/domain/usecases'
import { ProjectMongoRepository } from '@/infra/db'
import { DbAddProject } from '@/data/usecases'

export const makeDbAddProject = (): AddProject => {
  const projectMongoRepository = new ProjectMongoRepository()
  return new DbAddProject(projectMongoRepository)
}
