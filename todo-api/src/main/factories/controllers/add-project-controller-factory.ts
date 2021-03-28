import { makeAddProjectValidation, makeLogControllerDecorator, makeDbAddProject } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { AddProjectController } from '@/presentation/controllers'

export const makeAddProjectController = (): Controller => {
  const controller = new AddProjectController(makeAddProjectValidation(), makeDbAddProject())
  return makeLogControllerDecorator(controller)
}
