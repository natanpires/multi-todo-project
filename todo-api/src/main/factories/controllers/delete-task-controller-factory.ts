import { makeLogControllerDecorator, makeDbDeleteTask } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { DeleteTaskController } from '@/presentation/controllers'

export const makeDeleteTaskController = (): Controller => {
  const controller = new DeleteTaskController(makeDbDeleteTask())
  return makeLogControllerDecorator(controller)
}
