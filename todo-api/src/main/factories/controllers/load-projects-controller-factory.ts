import { makeLogControllerDecorator, makeDbLoadProjects } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { LoadProjectsController } from '@/presentation/controllers'

export const makeLoadProjectsController = (): Controller => {
  const controller = new LoadProjectsController(makeDbLoadProjects())
  return makeLogControllerDecorator(controller)
}
