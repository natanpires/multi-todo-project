import { makeLogControllerDecorator, makeDbDeleteProject } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { DeleteProjectController } from '@/presentation/controllers'

export const makeDeleteProjectController = (): Controller => {
  const controller = new DeleteProjectController(makeDbDeleteProject())
  return makeLogControllerDecorator(controller)
}
